# Install dependencies only when needed
FROM node:14-alpine AS deps
WORKDIR /server

# install nodemon globally
RUN yarn add nodemon -g

# Install dependencies
COPY package.json /server
RUN yarn

# Bundle app source
COPY . /server

# Exports
EXPOSE 8000

CMD ["yarn", "start"]