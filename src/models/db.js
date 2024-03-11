const mysql = require('mysql2')
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    multipleStatements: true, // Allow executing multiple statements in a single query
    connectionConfig: {
      noWrap: process.env.DB_NO_WRAP === 'true',
      transaction: process.env.DB_TRANSACTION === 'true',
    }
  });
module.exports=db;