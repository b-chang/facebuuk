# Install dependencies only when needed
FROM node:14-alpine AS deps
WORKDIR /server

# install nodemon globally
RUN yarn add nodemon -g

# Install dependencies
COPY package.json /server
# RUN yarn remove bcrypt
# RUN yarn add bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn

# Bundle app source
COPY . /server

# Exports
EXPOSE 8000

CMD ["yarn", "start"]