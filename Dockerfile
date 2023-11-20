
FROM node:21-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3000

# Build the Next.js application
RUN npx prisma generate && npm run build

# Start the Next.js application
CMD ["npm", "start"]
