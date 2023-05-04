let { user, password, database, host, connectionLimit } = require('../config');

const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit,
  host,
  user,
  password,
  database
});

function query (queryString) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) return reject(err); // not connected!
    
      // Use the connection
      connection.query(queryString, function (error, results, fields) {
        connection.release();
        
        if (error) return reject(error); 
        resolve(results)
        // When done with the connection, release it.
        
    
        // Handle error after the release.
    
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });

}
module.exports = { query };
console.log('初始化query sql文件');
