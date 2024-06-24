const { Pool } = require('pg');

const pool = new Pool({
    user: 'eduforall',
    host: 'postgres-db',
    database: 'eduforall',
    password: 'oyinkan1',
    port: '5432'
});

module.exports = pool;