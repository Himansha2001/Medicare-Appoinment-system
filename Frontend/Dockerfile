# Use official Node.js LTS image
FROM node:18 AS build

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./frontend .

# Build the frontend
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Copy built files to Nginx's default html directory
COPY --from=build /frontend/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
