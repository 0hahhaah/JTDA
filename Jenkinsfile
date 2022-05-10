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
//           // ./frontend/ 여기에 있는 dockerfile로 이미지 생성 및 build
//             steps {
//               sh 'docker build -t frontend ./frontend/'
//               sh 'docker run -it -p 80:80 frontend'
//               // sh 'docker-compose up -d --build -f '
       
//             }
//         }

//         // stage('Frontend Deploy') {
//         //     steps {
           
//         //         // -q : id만 출력 / --filter name=frontend 이름 frontend인 컨테이너만 출력 / 
//         //         // frontend 컨테이너 찾아서 실행중지 시키고 삭제
//         //         // sh 'docker ps -q --filter name=frontend | grep -q . && docker stop frontend && docker rm frontend'
              
//         //         // frontend 이름으로 새로 컨테이너 실행 
//         //         // -d: damon모드(백그라운드 실행), -p: 호스트포트:컨테이너포트, -u: 컨테이너실행될 리눅스 사용자 이름
//         //         sh 'docker run -d -p 3000:3000 --name frontend kurly_frontend'
//         //     }
//         // }

//         stage('Frontend Finish') {
//             steps{
//                 //-q:id만 출력, -f: 필터  dangling=true:이름없는 이미지들 
//                 // <none> tag 이미지들 삭제
//                 sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
//             }
//         }

//         // stage('Backend Build') {
//         //     steps {
//         //         sh 'chmod u+x ./backend/gradlew'
//         //         dir('backend') {
//         //             sh 'sh ./gradlew build'
//         //         }
//         //         sh 'docker build -t backend ./backend/'
//         //     }
//         // }

//         // stage('Backend Deploy') {
//         //     steps {
//         //         sh 'docker ps -q --filter name=backend | grep -q . && docker stop backend && docker rm backend'
//         //         sh 'docker run -v /var/tmp/springboot/files:/var/tmp/springboot/files -d -it -p 8080:8080 --name backend backend'
//         //     }
//         // }

//         // stage('Backend Finish') {
//         //     steps{
//         //         sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
//         //     }
//         // }
//     }
// }

pipeline {
    agent any

     environment {
        GIT_URL = "https://lab.ssafy.com/s06-final/S06P31S102.git"

    }

    tools {
        nodejs "nodejs-16.14.0"
    }

    stages {
        stage('Pull') {
            steps {
                git url: "${GIT_URL}", branch: "*/develop", poll: true, changelog: true
            }
        }
        
        stage('React Build') {
            steps {
                sh 'npm install -g yarn'
                sh 'yarn --cwd ./client install --network-timeout 100000'
                sh 'yarn --cwd ./client build'
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t nginx ./client/'
            }
        }
        
        stage('Deploy') {
            steps{
                sh 'docker ps -q --filter name=nginx | grep -q . && docker stop nginx && docker rm nginx'
                sh 'docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/letsencrypt/archive:/etc/letsencrypt/archive -u root nginx'
            }
        }

       stage('Finish') {
            steps{
                sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
            }
        }
    }
}