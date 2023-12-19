// baseDatos.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'cristian50',
  database: 'humedadp2'
});

connection.connect();

module.exports = {
  getConnection: () => connection,
};
