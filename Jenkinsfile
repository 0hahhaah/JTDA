pipeline {
    agent none
    //기본적으로 체크아웃을 하지 않는 옵션
    options { skipDefaultCheckout(true) }
    stages {
        stage('Checkout repository') {
            agent any
            steps {
                checkout scm
            }
        }
   
        stage('Build') {
            agent {
                docker {
                    image 'node:16.14.0 '
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t node:latest . --name frontend'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f name=frontend -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -f name=frontend -q | xargs -r docker container rm'
                sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
                sh 'docker run -d --name frontend -p 80:80 frontend:latest'
            }
        }
    }
}
// pipeline {
//     agent any
    
//     environment {
//         GIT_URL = "https://lab.ssafy.com/s06-final/S06P31S102.git"
//     }

//     tools {
//         nodejs "nodejs-16.14.0"
//     }

//     stages {
//         stage('Frontend Build') {
//             steps {
//                 sh 'docker build -t frontend ./frontend/'
//             }
//         }

//         stage('Frontend Deploy') {
//             steps {
//                 sh 'docker ps -a -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
//                 sh 'docker-compose up --build -f ./frontend'
//             }
//         }

//         stage('Frontend Finish') {
//             steps{
//                 sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
//             }
//         }

//         // stage('Frontend Deploy') {
//         //     steps {
//         //         sh 'docker ps -a -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
//         //         sh 'docker run -it -d -p 80:80 -p 443:443 -p 3000:3000 -v "/home/ubuntu/cert/:/home/ubuntu/cert/" -u root --name frontend frontend'
//         //     }
//         // }

//     }
// }

