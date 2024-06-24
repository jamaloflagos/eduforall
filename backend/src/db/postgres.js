require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    port: '5432',
    connectionTimeoutMillis: 30000 ,
    ssl: { rejectUnauthorized: false, require: true }
});

module.exports = pool;