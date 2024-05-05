const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant-finder",
});
connection.connect();

function asyncMySql(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = asyncMySql;
