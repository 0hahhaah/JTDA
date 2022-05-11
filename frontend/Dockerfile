FROM nginx:latest
VOLUME /frontend_volume
RUN rm -rf /etc/nginx/conf.d/default.conf
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
ADD ./build /usr/share/nginx/html