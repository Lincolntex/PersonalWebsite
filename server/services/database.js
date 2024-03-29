// db.js
import postgres from 'postgres'

const sql = postgres({ 
    host: 'localhost',
    port: 5454,
    username: 'postgres',
    password: 'password',
    database: 'personalwebsite'
 }) // will use psql environment variables

export default sql