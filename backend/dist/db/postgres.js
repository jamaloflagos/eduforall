"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eduforall',
    password: 'oyinkan1',
    port: '5432'
});
module.exports = pool;
