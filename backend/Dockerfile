FROM node
WORKDIR /app
COPY package*.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
    npm install; \
  else \
    npm ci --only=production; \
  fi
COPY . .
CMD ["node", "index.js"]
        
