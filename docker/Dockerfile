FROM  node:16.16.0-alpine3.16  AS build
WORKDIR /home/node
COPY . .
RUN yarn install --silent
RUN yarn cache clean


# Runtime container
FROM node:16.16.0-alpine3.16

WORKDIR /intama-service-keystone


COPY --from=build /home/node .

CMD ["yarn", "run-prod"]
