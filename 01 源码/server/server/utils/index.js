const mysql = require('mysql')
const { database, user, password, secret } = require('../config')
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
  database,
  user,
  password
})

const postQuery = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sql, (err,data) => {
        connection.release();
        if (err) return reject(err);
        resolve(data);
      });
    })
  })
};

const verify = (header) => {
  debugger
  let { token } = header;
  try {
    jwt.verify(token, secret);
    return true;
  } catch(err) {
    return false;
  }
}

module.exports = {
  postQuery,
  verify
}