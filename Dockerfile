# Build step #1: build the React front end
FROM node:16-alpine as build

WORKDIR /app

COPY ./app/package.json ./
COPY ./app/src ./src
COPY ./app/public ./public
RUN npm install
RUN npm run build

# Build step #2: build the API with the client as static files
FROM python:3.9-bullseye
COPY --from=build /app/build ./build

RUN mkdir ./api
COPY ./app/backend ./api
RUN pip install --upgrade pip
RUN pip install -r ./api/requirements.txt
ENV FLASK_ENV production

EXPOSE 5000
WORKDIR /api

CMD ["gunicorn", "-b", ":5000", "main:app"]