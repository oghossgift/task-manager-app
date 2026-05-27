//database connection.
const { Pool } = require('pg'); //Using the 'Pool' class from the pg library because it allows us to manage and use multiple connections. 
require('dotenv').config();//Loads our .env file into process.

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,// No hard coding of sensitive information for security purposes
});

module.exports = pool;
