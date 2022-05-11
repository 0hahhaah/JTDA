tagArray=("Monitoring", "WebService", "Frontend", "Backend", "DataBase", "Monitoring", "WebService", "Frontend", "Backend", "DataBase")

for i in {1..10}
do
    echo "Running container $i"
    docker run -d --name "thread-producer-$i" -e  CLUSTER=CLUSTER-ONE -e HOST=HOST-$i -e TAGS=${tagArray[i]} thread-producer
done
