# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Setup environment
ENV NODE_ENV=production

# Copy configs to the working directory
COPY package*.json ./
COPY yarn.lock ./
COPY ./prisma ./prisma

# Clean cache to prevent server storage to overload
RUN yarn cache clean

# Install the application dependencies
RUN yarn install --frozen-lockfile

# Clean cache to prevent server storage to overload
RUN yarn cache clean

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]