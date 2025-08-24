# Stupf

A to-do app built on [GTD Principals](https://gettingthingsdone.com/)

## Frontend

# Building from source

1. Build app with vite

```
npm run build
```

2. Rebuild the docker image

```
docker built . -t <tag-name>
```

## Backend
The backend runs on express and postgres. To build a development environment:

1. Install dependencies:

```
npm install
```

2. Create a .env file in the root of the api folder with the following values (adjust as desired):

```
DEV_DB_NAME=stupf
DEV_DB_HOST=localhost
DEV_DB_PORT=5432
DEV_DB_USER=my-db-user
DEV_DB_PASSWORD=my-password
```

3. Bring up the dev postgres container:

```
cd dev-pg-compose && docker compose --env-file ../.env up -d
```

4. Run the api server with nodemon:

```
npm run dev
```