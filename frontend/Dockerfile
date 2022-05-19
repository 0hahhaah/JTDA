FROM node:16.14.0 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent


EXPOSE 3000
CMD ["npm", "start"]
