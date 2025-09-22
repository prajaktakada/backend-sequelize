# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy all files
COPY . .

# Expose port (make sure this matches your app.js port, e.g. 3000)
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
