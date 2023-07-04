FROM node:18

# working dir
WORKDIR /app

# Copy Package Json Files
COPY . /app  

# Install files
RUN npm install

# Expose the API Port
EXPOSE 8000

# RUN Nodejs app
CMD node index.js