# ---------- Builder Image -----------
# pull official base image
FROM node:12-alpine as Builder

#Set Argument
ARG ENV

WORKDIR /root/

# add `/root/node_modules/.bin` to $PATH
ENV PATH /root/node_modules/.bin:$PATH

COPY package*.json /root/

# install dependenciesll
RUN npm install -q

COPY . /root

RUN ng build --configuration $ENV

# ---------- Release Image -----------
# pull official base image
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html/

COPY --from=Builder /root/dist/martha-web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf 