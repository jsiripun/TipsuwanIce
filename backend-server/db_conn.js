const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_ROLES_QUERY = "SELECT * FROM roles";
const SELECT_ALL_EMPLOYEES_QUERY = "SELECT * FROM employees";
const SELECT_ALL_CUSTOMERS_QUERY = "SELECT * FROM customers";
const SELECT_ALL_INVOICES_QUERY = "SELECT * FROM invoices";

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'dbpassword',
	database: 'db_tipsuwan'
});

connection.connect(err => {
	if(err) {
		return err;
	}
});

module.exports = connection