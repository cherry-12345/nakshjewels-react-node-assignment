# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# Build with the Docker-specific API URL
ENV REACT_APP_API_URL=http://localhost:5000/api
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
