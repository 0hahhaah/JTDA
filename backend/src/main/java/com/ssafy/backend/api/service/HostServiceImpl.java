package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.*;
import com.ssafy.backend.core.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

@Service("HostListService")
public class HostServiceImpl implements HostService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public HostServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    private static final String stringLogTime = "logTime";
    private static final String stringCluster = "cluster";
    private static final String stringTags = "tags";
    private static final String stringHost = "host";
    private static final String stringThreadCount = "threadCount";
    private static final String stringVmInfo = "vmInfo";
    private static final String stringThreadElements = "threadElements";
    private static final String stringThreadDumps = "threadDumps";
    private static final String stringThreadStateCount = "threadStateCount";
    private static final String stringClass = "_class";
    private static final String stringCollectionName = "threaddump";


    @Override
    public HostSearchRes getHostSearch(String startAt, String endAt, String query) {
        boolean isRegexFlag = isRegex(query);
        boolean isStartDate = isDateTime(startAt);
        boolean isEndDate = isDateTime(endAt);
        boolean areDatesEqual = startAt.equals(endAt);

        Query queryRegex = new Query();
        if(isRegexFlag) {
            if(isEndDate) {
                if(isStartDate) {
                    if(query.isEmpty()) {
                        if(!areDatesEqual) {
                            // startAt, endAt 입력
                            queryRegex.addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt));
                        } else {
                            // startAt, endAt 입력, 시간 같음
                            queryRegex.addCriteria(Criteria.where(stringLogTime).regex(endAt));
                        }
                    } else {
                        if(!areDatesEqual) {
                            // startAt, endAt, query 모두 입력
                            queryRegex.addCriteria(Criteria.where(stringHost).regex(query))
                                    .addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt));
                        } else {

                            // startAt, endAt, query 모두 입력, 시간 같음
                            queryRegex.addCriteria(Criteria.where(stringHost).regex(query))
                                    .addCriteria(Criteria.where(stringLogTime).regex(endAt));
                        }
                    }
                } else {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    LocalDateTime tempEndDate = LocalDateTime.parse(endAt.replace(" ", "T"));
                    String tempStartDate = tempEndDate.minusMinutes(1).format(formatter);

                    if(query.isEmpty()) {
                        // endAt 입력
                        queryRegex.addCriteria(Criteria.where(stringLogTime).gte(tempStartDate).lte(endAt))
                                .with(Sort.by(Sort.Order.desc(stringLogTime)));
                    } else {
                        // endAt, query 입력
                        queryRegex.addCriteria(Criteria.where(stringLogTime).gte(tempStartDate).lte(endAt))
                                .addCriteria(Criteria.where(stringHost).regex(query))
                                .with(Sort.by(Sort.Order.desc(stringLogTime)));
                    }
                }
            } else {
                if(!query.isEmpty() && !isStartDate) {
                    // query 입력
                    queryRegex.addCriteria(Criteria.where(stringHost).regex(query));
                }
            }

        } else {
            return new HostSearchRes("", "", 0, new ArrayList<>(), "");
        }
        queryRegex.fields().exclude(stringLogTime).exclude(stringThreadCount).exclude(stringVmInfo)
                .exclude(stringThreadElements).exclude(stringThreadDumps).exclude(stringThreadStateCount)
                .exclude(stringClass);
        List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, stringCollectionName));

        return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
    }

    @Override
    public HostListRes getHostList(String startAt, String endAt, String cluster, String tags) {
        boolean isStartDate = isDateTime(startAt);
        boolean isEndDate = isDateTime(endAt);
        boolean areDatesEqual = startAt.equals(endAt);

        boolean isRegexFlag = false;
        if(!cluster.isEmpty()) {
            isRegexFlag = isRegex(cluster);
        }

        boolean isTag = false;
        List<String> tagList = new ArrayList<>();
        if(!tags.isEmpty()) {
            isTag = true;
            tagList = Arrays.asList(tags.split(","));
            for (String tag : tagList) {
                if (!isRegex(tag)) {
                    isTag = false;
                    break;
                }
            }
        }

        Query query = new Query();

        if(isStartDate && isEndDate) {
            if(isTag) {
                if(isRegexFlag) {
                    if(!areDatesEqual) {
                        query.addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt))
                                .addCriteria(Criteria.where(stringCluster).regex(cluster))
                                .addCriteria(Criteria.where(stringTags).in(tagList));
                    } else {
                        query.addCriteria(Criteria.where(stringLogTime).regex(endAt))
                                .addCriteria(Criteria.where(stringCluster).regex(cluster))
                                .addCriteria(Criteria.where(stringTags).in(tagList));
                    }
                } else {
                    if(!areDatesEqual) {
                        query.addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt))
                                .addCriteria(Criteria.where(stringTags).in(tagList));
                    } else {
                        query.addCriteria(Criteria.where(stringLogTime).regex(endAt))
                                .addCriteria(Criteria.where(stringTags).in(tagList));
                    }
                }
            } else {
                if(isRegexFlag) {
                    if(!areDatesEqual) {
                        query.addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt))
                                .addCriteria(Criteria.where(stringCluster).regex(cluster));
                    } else {
                        query.addCriteria(Criteria.where(stringLogTime).regex(endAt))
                                .addCriteria(Criteria.where(stringCluster).regex(cluster));
                    }
                } else {
                    if(!areDatesEqual) {
                        query.addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt));
                    } else {
                        query.addCriteria(Criteria.where(stringLogTime).regex(endAt));
                    }
                }
            }
        } else {
            return new HostListRes("", "", new hostListSearchInputRes("", new ArrayList<>()), 0, new ArrayList<>());
        }
        query.fields().exclude(stringLogTime).exclude(stringThreadCount).exclude(stringVmInfo)
                .exclude(stringThreadElements).exclude(stringThreadDumps).exclude(stringThreadStateCount)
                .exclude(stringClass);
        List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(query, HostList.class, stringCollectionName));
        List<HostListResultsRes> hostListResultsResList = new ArrayList<>();
        Map<String, List<HostListResultsEachRes>> hostListResultsResMap = new HashMap<>();
        for(HostList hostList : queryResult) {
            hostListResultsResMap.put(hostList.getCluster(), new ArrayList<>());
        }
        for(HostList hostList : queryResult) {
            hostListResultsResMap.get(hostList.getCluster()).add(new HostListResultsEachRes(hostList.getHost(), hostList.getTags()));
        }
        for(String eachCluster : hostListResultsResMap.keySet()) {
            Collections.sort(hostListResultsResMap.get(eachCluster));
            hostListResultsResList.add(new HostListResultsRes(eachCluster, hostListResultsResMap.get(eachCluster)));
        }

        return new HostListRes(startAt, endAt, new hostListSearchInputRes(cluster, tagList), queryResult.size(), hostListResultsResList);
    }


    @Override
    public HostStateRes getHostState(String host, String time) {
        List<String> hosts = new ArrayList<>();
        if(!host.isEmpty()) {
            hosts = Arrays.asList(host.split(","));
        }
        Set<String> hostsNoDuplicate = new HashSet<>(hosts);

        Query query = new Query();
        query.addCriteria(Criteria.where(stringHost).in(hostsNoDuplicate))
                .addCriteria(Criteria.where(stringLogTime).regex(time))
                .with(Sort.by(Sort.Direction.ASC, stringHost))
                .fields().exclude(stringCluster).exclude(stringTags).exclude(stringVmInfo)
                .exclude(stringThreadElements).exclude(stringClass);
        List<HostState> queryResult = removeDuplicateHostState(mongoTemplate.find(query, HostState.class, stringCollectionName));
        List<HostStateWithDaemonCountRes> returnHosts = new ArrayList<>();

        for(HostState hostState : queryResult) {
            int daemonCount = 0;
            int nonDaemonCount = 0;
            List<ThreadDumps> threadDumpsList = hostState.getThreadDumps();
            for(ThreadDumps threadDumps : threadDumpsList) {
                if(threadDumps.isDaemon()) {
                    daemonCount += 1;
                } else {
                    nonDaemonCount += 1;
                }
            }
            returnHosts.add(new HostStateWithDaemonCountRes(hostState.get_id(), hostState.getHost(), hostState.getLogTime(), hostState.getThreadCount(), hostState.getThreadStateCount(), daemonCount, nonDaemonCount));
        }

        return new HostStateRes(returnHosts);
    }


    @Override
    public HostTagRes getHostTag(String startAt, String endAt) {
        boolean isStartDate = isDateTime(startAt);
        boolean isEndDate = isDateTime(endAt);
        boolean areDatesEqual = startAt.equals(endAt);

        Query query = new Query();
        if(isStartDate && isEndDate) {
            if(!areDatesEqual) {
                query.addCriteria(Criteria.where(stringLogTime).gte(startAt).lte(endAt));
            } else {
                query.addCriteria(Criteria.where(stringLogTime).regex(endAt));
            }
        } else {
            return new HostTagRes(new ArrayList<>());
        }

        query.fields().exclude(stringCluster).exclude(stringHost).exclude(stringLogTime).exclude(stringThreadCount)
                .exclude(stringVmInfo).exclude(stringThreadElements).exclude(stringThreadDumps)
                .exclude(stringThreadStateCount).exclude(stringClass);
        List<HostTag> queryResult = mongoTemplate.findDistinct(query, stringTags, stringCollectionName, HostTag.class);
        Set<HostTag> returnTag = new HashSet<>(queryResult);

        return new HostTagRes(new ArrayList<>(returnTag));
    }


    private boolean isDateTime(String input) {
        try {
            LocalDateTime.parse(input.replace(" ", "T"));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isRegex(String input) {
        try {
            input = URLDecoder.decode(input, "UTF-8");
        } catch (UnsupportedEncodingException ignored) {
        }

        try {
            Pattern.compile(input);
            return true;
        } catch (PatternSyntaxException e) {
            return false;
        }
    }

    private List<HostSearch> removeDuplicateHostSearch(List<HostSearch> input) {
        Set<HostSearch> setInput = new HashSet<>(input);
        return new ArrayList<>(setInput);
    }

    private List<HostState> removeDuplicateHostState(List<HostState> input) {
        TreeSet<HostState> setInput = new TreeSet<>(input);
        return new ArrayList<>(setInput);
    }

    private List<HostList> removeDuplicateHostList(List<HostList> input) {
        Set<HostList> setInput = new HashSet<>(input);
        return new ArrayList<>(setInput);
    }
}
