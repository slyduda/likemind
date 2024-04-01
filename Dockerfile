# Use Node.js as base image
FROM node:20

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port Nuxt.js will be running on
EXPOSE 3000

# Command to run the Nuxt.js application
CMD ["yarn", "dev"]