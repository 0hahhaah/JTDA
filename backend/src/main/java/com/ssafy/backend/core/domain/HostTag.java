package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class HostTag {

    private List<String> tags;

    public HostTag(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public int hashCode() {
        return tags.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if(!(obj instanceof HostTag)) {
            return false;
        }
        HostTag hostTag = (HostTag) obj;
        return tags.equals(hostTag.tags);
    }
}
