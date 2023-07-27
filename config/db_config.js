module.exports = {
    options: {
        logging: false,
        "dialect": "mysql",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "database":  process.env.DB_NAME,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    }
}