pipeline {
    agent any
    
    environment {
        GIT_URL = "https://lab.ssafy.com/s06-final/S06P31S102.git"
    }

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Frontend Build') {
            steps {
                sh 'docker build -t frontend ./frontend/'
            }
        }

        stage('Frontend Deploy') {
            steps {
                sh 'docker ps -a -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
                sh 'docker-compose up --build -f ./frontend'
            }
        }

        stage('Frontend Finish') {
            steps{
                sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
            }
        }

        // stage('Frontend Deploy') {
        //     steps {
        //         sh 'docker ps -a -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
        //         sh 'docker run -it -d -p 80:80 -p 443:443 -p 3000:3000 -v "/home/ubuntu/cert/:/home/ubuntu/cert/" -u root --name frontend frontend'
        //     }
        // }

    }
}

