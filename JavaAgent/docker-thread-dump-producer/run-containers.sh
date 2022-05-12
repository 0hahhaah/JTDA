tagArray=("Monitoring", "WebService", "Frontend", "Backend", "DataBase", "Monitoring", "WebService", "Frontend", "Backend", "DataBase")

for i in {1..10}
do
    echo "Running container $i"
    host="k6s1023${i}.p.ssafy.io"
    docker run -d --name "thread-producer-$i" -e  CLUSTER=CLUSTER-THREE -e HOST=$host -e TAGS=${tagArray[i]} thread-producer
done
