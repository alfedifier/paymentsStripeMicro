FROM node:16.15.1 as build
WORKDIR /app
COPY ./package.json .
RUN npm install
RUN npm rebuild bcrypt --build-from-source


FROM node:16.15.1
WORKDIR /app
copy --from=build /app/node_modules /app/node_modules
copy . .

RUN ln -sfn /usr/share/zoneinfo/Europe/Madrid /etc/localtime

RUN npm run build

EXPOSE 3001
EXPOSE 3006
EXPOSE 3002

CMD npm run start:prod

