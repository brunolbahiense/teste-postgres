const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database: 'biblioteca',
    password: 'pBlalm3id@',
    port: 5432
})

const query = (text, param) => {
    return pool.query(text, param)
}

module.exports = {
    query
}