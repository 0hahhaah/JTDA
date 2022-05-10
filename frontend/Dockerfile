FROM node:16.14.0 as builder

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@5.0.1 -g 

# 소스를 작업폴더로 복사하고 빌드
COPY . /app
RUN npm run build

FROM nginx:latest
# nginx의 기본 설정을 삭제
RUN rm -rf /etc/nginx/conf.d
# 내가 작성한 설정 파일을 복사
COPY conf /etc/nginx
# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /app/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
