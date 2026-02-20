// ============================================================================
// SNOWFLAKE DATABASE CONNECTION
// ============================================================================

const snowflake = require('snowflake-sdk');
require('dotenv').config();

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USERNAME,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
});

function connect() {
  return new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) {
        reject(new Error('Snowflake connection failed: ' + err.message));
      } else {
        console.log('Connected to Snowflake, connection id: ' + conn.getId());
        resolve(conn);
      }
    });
  });
}

function query(sql, binds = []) {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: sql,
      binds,
      complete: (err, _stmt, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    });
  });
}

module.exports = { connect, query };
