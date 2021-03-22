# pull official base image
FROM node:alpine

# set working directory
WORKDIR /


# install app dependencies
COPY package.json ./
RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]
