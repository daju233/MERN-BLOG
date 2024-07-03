FROM node:18.20.1
COPY . /mern-blog
WORKDIR /mern-blog
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm i
WORKDIR /mern-blog/client
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm i
EXPOSE 3000
