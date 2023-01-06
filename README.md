# CraftConnect

## Installation

Pour commencer :
```
yarn install
```

Ensuite, créez un fichier .env à la racine et rajoutez ces variables : 
```
DB_HOST=db
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PORT=5432
APP_PORT=3000
```

## Lancement de l'application

```bash
(sudo) docker compose up
```

## Documentation API Swagger

```
http://127.0.0.1:3000
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```
