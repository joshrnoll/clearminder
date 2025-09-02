# ClearMinder

<img src="ui/public/favicon/android-chrome-192x192.png" style="border-radius: 15px; margin: 5px;" />

#### A to-do app built on [GTD Principals](https://gettingthingsdone.com/).

## Set Up Development Environment

1. Create a ```.env``` file:

```
cp .env.example .env
```

2. Bring up the dev postgres container:

```
cd api/dev-pg-compose && docker compose --env-file ../../.env up -d
```

3. Start the API server:

```
cd ../ && npm install && npm run dev
```

4. Start the frontend. Open a *second terminal* window and run:

```
cd ui && npm install && npm run dev
```