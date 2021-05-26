FROM node:12-alpine
WORKDIR /src
COPY . /src/
RUN npm i --production
ENV HOST=localhost
ENV PORT=3005
ENV FRONTEND_HOST=localhost
ENV FRONTEND_PORT=3000
ENV DB_HOST=localhost
ENV DB_PORT=27017
CMD ["node", "app.js"]
