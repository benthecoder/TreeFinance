# Build step #1: build the React front end
FROM node:16-alpine as build

WORKDIR /app

COPY ./app/package.json ./
COPY ./app/src ./src
COPY ./app/public ./public
RUN npm install
RUN npm run build

# Build step #2: build the API with the client as static files
FROM python:3.9-alpine
COPY --from=build /app/build ./build

RUN mkdir ./api
COPY ./app/backend ./api
RUN pip install --upgrade pip
RUN pip install -r ./api/requirements.txt
ENV FLASK_ENV production

EXPOSE 3000
WORKDIR /app/api

CMD ["gunicorn", "-b", ":3000", "api:app"]