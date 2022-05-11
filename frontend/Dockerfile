FROM node:16.14.0 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
