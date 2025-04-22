FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
# Change this line to match your actual output directory
COPY --from=build /app/dist/* /usr/share/nginx/html
# OR if your app output is directly in a folder named after your project:
# COPY --from=build /app/dist/project-bolt /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]