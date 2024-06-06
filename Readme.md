preparation:

1. installing dependencies:
   `yarn install`

2. create .env file like:

```
SERVER_PORT=8010

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=3232
DB_NAME=test-bysyness-sector

APP_SECRET=secret-key
```

3. create static folder `static/uploads` in the root directory for static files

to run in dev mode:
`yarn start:dev`

to build
`yarn build`
