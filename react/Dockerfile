FROM node:latest as build-stage

WORKDIR /react

copy package*.json ./

RUN npm install

COPY src ./src

COPY public ./public

RUN npm run build

# starting nginx build-stage
FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=build-stage /react/build/ .

# removing default nginx config file
RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /etc/nginx/conf.d
# copying our nginx config
COPY ./default.conf .

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]