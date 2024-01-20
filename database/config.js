require('dotenv').config();

const config = {
    db:{
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER || "root",
        port: 3306,
        password: process.env.DB_PASS || "Elie2003!",
        database: process.env.DB_NAME || "patch_care",
        connectionLimit: 10,
    }
}

module.exports = config;