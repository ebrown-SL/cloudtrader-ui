FROM node:12.17.0-alpine AS builder

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY . /app
RUN npm run buildp

FROM nginx:1.18.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/cloudtrader-ui /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]

EXPOSE 80
