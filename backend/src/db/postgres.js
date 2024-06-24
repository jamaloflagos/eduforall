require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_HOST,
    password: 'oyinkan1.',
    port: '5432',
    connectionTimeoutMillis: 30000 ,
    ssl: { rejectUnauthorized: false, require: true }
});

module.exports = pool;