# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install dependencies within the container
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 5000

# Start the server in development mode using nodemon
CMD ["npx", "nodemon", "-L", "index.js"]
