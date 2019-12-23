FROM nginx

COPY build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]