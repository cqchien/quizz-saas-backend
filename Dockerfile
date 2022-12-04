FROM node:lts AS dist
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build:prod

FROM node:lts AS node_modules
COPY package.json yarn.lock ./

RUN yarn install --prod

FROM node:lts

ARG PORT=3000

RUN mkdir -p /app

WORKDIR /app

COPY --from=dist dist /app/dist
COPY --from=node_modules node_modules /app/node_modules

COPY . /app

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]
