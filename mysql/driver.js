const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant-finder",
});
connection.connect();

function asyncMySql(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject();
        return;
      }
      resolve(results);
    });
  });

  module.exports = asyncMySql;
}
