pipeline {
    agent any
    
    environment {
        GIT_URL = "https://lab.ssafy.com/s06-final/S06P31S102.git"
    }

    tools {
        nodejs "nodejs-16.14.0"
    }

    stages {
        stage('Frontend Build') {
          // ./frontend/ 여기에 있는 dockerfile로 이미지 생성 및 build
            steps {
              sh 'docker build -t frontend  ./frontend/'
            }
        }

        stage('Frontend Deploy') {
            steps {
                sh 'docker ps -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
                sh 'docker run -it -d -p 80:80 -p 443:443 -p 3000:3000 -v "/home/ubuntu/cert/:/home/ubuntu/cert/" -u root --name frontend frontend'
                echo 'Frontend Deploy 성공!!!!!!!!!!!!!!'
            }
        }

        stage('Frontend Finish') {
            steps{
                //-q:id만 출력, -f: 필터  dangling=true:이름없는 이미지들 
                // <none> tag 이미지들 삭제
                sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
            }
        }

        // stage('Backend Build') {
        //     steps {
        //         sh 'chmod u+x ./backend/gradlew'
        //         dir('backend') {
        //             sh 'sh ./gradlew build'
        //         }
        //         sh 'docker build -t backend ./backend/'
        //     }
        // }

        // stage('Backend Deploy') {
        //     steps {
        //         sh 'docker ps -q --filter name=backend | grep -q . && docker stop backend && docker rm backend'
        //         sh 'docker run -v /var/tmp/springboot/files:/var/tmp/springboot/files -d -it -p 8080:8080 --name backend backend'
        //     }
        // }

        // stage('Backend Finish') {
        //     steps{
        //         sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
        //     }
        // }
    }
}

