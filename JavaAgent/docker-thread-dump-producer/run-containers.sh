for i in {1..10}
do
    echo "Running container $i"
    docker run -d --name "thread-producer-$i" thread-producer:latest
done
