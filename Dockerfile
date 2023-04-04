# Step 1: build production code.
FROM node:14.15.0-alpine as fe_source

WORKDIR /app

COPY . ./

RUN yarn && npm run build

# Step 2: move bundled source to apache http.
# Notice: httpd.conf is copied from httpd version 2.4.46.
# If you change apache version, remember to update this file accordingly.
FROM httpd:2.4.46-alpine

COPY --from=fe_source /app/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=fe_source /app/build /usr/local/apache2/htdocs/fe-app
COPY --from=fe_source /app/start.sh /usr/local/apache2/htdocs/start.sh
RUN sed -i 's/\r//' /usr/local/apache2/htdocs/start.sh

EXPOSE 80

# Step 3: run start.sh script when server start.
ENTRYPOINT ["/bin/sh", "/usr/local/apache2/htdocs/start.sh"]