# ---------- Builder Image -----------
# pull official base image
FROM node:12.16.2-alpine3.11 as Builder

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
RUN ls /root/dist

# ---------- Release Image -----------
# pull official base image
FROM nginx:1.17-alpine

COPY --from=Builder /root/dist/martha-web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf 