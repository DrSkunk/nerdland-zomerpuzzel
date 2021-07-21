FROM node:lts
WORKDIR /usr/nerdland-zomerpuzzel

ENV TZ=Europe/Brussels
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "start" ]
