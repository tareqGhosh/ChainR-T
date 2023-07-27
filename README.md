# skills-dtc

## Usage

Download:

```bash
$ go get -u github.com/iAmPlus/dtc-merchant-service
```

run Postgres Docker container
```bash
$ docker run --name some-postgres -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=admin -e POSTGRES_DB=defaultdb -p 35432:5432 -d postgres 
```

## Using Docker Compose Run Required Services

We can use docker compose for Postgres and Resdis using follwoing command.

Run container

```bash
docker-compose up -d
```

See runing process

```bash
docker-compose ps
```

To stop container

```bash
docker-compose down
```


## Run Project

```
Make sure to make an env file that looks like this:
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=8889
DB_NAME=chainR
DB_USERNAME=root
DB_PASSWORD=root
PORT=3000
SECRET=asdasdasdasdwafaipojfopaejfopajmjfopajwjpofja
```
```bash
npm install
npm run start 
```

