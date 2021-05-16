# base image
FROM node:alpine as build

# add python and g++
RUN apk update && apk add python make g++

# work dir
WORKDIR /app

# copy package.json
COPY ./package.json ./

# install dependency
RUN yarn install

# copy project files
COPY ./ ./

# build project
RUN yarn run build

# create nginx server
FROM nginx

# expose port 80
EXPOSE 80

# copy build to nginx server
COPY --from=build /app/build/ /usr/share/nginx/html/

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
