# Open A.7. Deploy storybook.md in docs folder for more information.

# Step 1: move bundled source to apache http.
# Notice: httpd.conf is copied from httpd version 2.4.46.
# If you change apache version, remember to update this file accordingly.
FROM httpd:2.4.46-alpine

WORKDIR /app

COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY .htpasswd /usr/local/apache2/conf/.htpasswd
COPY storybook-static /usr/local/apache2/htdocs/fe-app