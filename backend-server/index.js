const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_ROLES_QUERY = "SELECT * FROM roles";
const SELECT_ALL_EMPLOYEES_QUERY = "SELECT * FROM employees";
const SELECT_ALL_CUSTOMERS_QUERY = "SELECT * FROM customers";

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

app.use(cors());

app.get('/', (req, res) => {
	let message = "go to /roles for roles ---- go to /employee for employees";
	res.send(message);
});

/*
======================== ROLES =========================
*/

app.get('/roles', (req, res) => {
	connection.query(SELECT_ALL_ROLES_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err)
		} else {
			return res.json({
				data: results
			})
		}
	});
});

app.get('/roles/add', (req, res) => {
	const { rolename } = req.query;
	const INSERT_ROLE_QUERY = 'INSERT INTO roles (role_name) VALUES (?)';
	connection.query(INSERT_ROLE_QUERY, rolename, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully added roles');
		}
	});
});

app.get('/roles/delete', (req, res) => {
	const { rolename } = req.query;
	const DELETE_ROLE_QUERY = 'DELETE FROM roles WHERE role_name in (?)';
	connection.query(DELETE_ROLE_QUERY, rolename, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully deleted roles');
		}
	});
});

/*
======================== EMPLOYEES =========================
*/

app.get('/employees', (req, res) => {
	connection.query(SELECT_ALL_EMPLOYEES_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err)
		} else {
			for (let i = 0; i < results.length; i++) {
				results[i].active = results[i].active[0];
			}
			return res.json({
				data: results
			})
		}
	});
});

app.get('/employees/add', (req, res) => {
	let {loginID, password, active, firstName, lastName, email, phoneNumber } = req.query;
	console.log(loginID, password, active, firstName, lastName, email, phoneNumber);
	if (typeof loginID === 'undefined' || typeof password === 'undefined' || typeof active === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined') {
		return res.send("Need to enter loginID, password, active, firstName, and lastName");
	}
	if (typeof email === 'undefined') {
		email = "";
	}
	if (typeof phoneNumber === 'undefined') {
		phoneNumber = "";
	}
	const INSERT_EMPLOYEE_QUERY = `INSERT INTO employees (loginID, password, active, firstName, lastName, email, phoneNumber) VALUES ('${loginID}', '${password}', ${active}, '${firstName}', '${lastName}', '${email}', '${phoneNumber}')`;
	connection.query(INSERT_EMPLOYEE_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully added employee');
		}
	});
});

app.get('/employees/modify', (req, res) => {
	let {loginID, password, active, firstName, lastName, email, phoneNumber } = req.query;
	console.log(loginID, password, active, firstName, lastName, email, phoneNumber);
	if (typeof loginID === 'undefined' || typeof password === 'undefined' || typeof active === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined') {
		return res.send("Need to enter loginID, password, active, firstName, and lastName");
	}
	if (typeof email === 'undefined') {
		email = "";
	}
	if (typeof phoneNumber === 'undefined') {
		phoneNumber = "";
	}
	const MODIFY_EMPLOYEE_QUERY = `UPDATE employees SET password='${password}', active= ${active}, firstName='${firstName}', lastName='${lastName}', email='${email}', phoneNumber='${phoneNumber}' WHERE loginID = '${loginID}'`;
	connection.query(MODIFY_EMPLOYEE_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully modified employees');
		}
	});
});

app.get('/employees/delete', (req, res) => {
	let {loginID} = req.query;
	const DELETE_EMPLOYEE_QUERY = `DELETE FROM employees WHERE loginID = '${loginID}'`;
	connection.query(DELETE_EMPLOYEE_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully deleted employees');
		}
	});
});

/*
======================== CUSTOMERS =========================
*/

app.get('/customers', (req, res) => {
	connection.query(SELECT_ALL_CUSTOMERS_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err)
		} else {
			return res.json({
				data: results
			})
		}
	});
});

app.get('/customers/add', (req, res) => {
	let {customerID, active, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance } = req.query;
	console.log(customerID, active, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance);
	if (typeof customerID === 'undefined' || typeof active === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' || typeof outstandingMoneyBalance === 'undefined' || typeof outstandingBagBalance === 'undefined') {
		return res.send("Need to enter customerID, active, firstName, lastName, outstandingMoneyBalance, and outstandingBagBalance");
	}
	if (typeof email === 'undefined') {
		email = "";
	}
	if (typeof phoneNumber === 'undefined') {
		phoneNumber = "";
	}
	const INSERT_CUSTOMERS_QUERY = `INSERT INTO customers (customerID, active, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance) VALUES ('${customerID}', ${active}, '${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${outstandingBagBalance}', '${outstandingMoneyBalance}')`;
	connection.query(INSERT_EMPLOYEE_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully added customers');
		}
	});
});

app.get('/customers/modify', (req, res) => {
	let { customerID, active, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance } = req.query;
	console.log(customerID, active, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance);
	if (typeof customerID === 'undefined' || typeof active === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' || typeof outstandingMoneyBalance === 'undefined' || typeof outstandingBagBalance === 'undefined') {
		return res.send("Need to enter customerID, active, firstName, lastName, outstandingMoneyBalance, and outstandingBagBalance");
	}
	if (typeof email === 'undefined') {
		email = "";
	}
	if (typeof phoneNumber === 'undefined') {
		phoneNumber = "";
	}
	const MODIFY_EMPLOYEE_QUERY = `UPDATE customers SET active= ${active}, firstName='${firstName}', lastName='${lastName}', email='${email}', phoneNumber='${phoneNumber}, outstandingMoneyBalance='${outstandingMoneyBalance}', outstandingBagBalance='${outstandingBagBalance}' WHERE customerID = '${customerID}'`;
	connection.query(MODIFY_EMPLOYEE_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully modified roles');
		}
	});
});


app.listen(4000, () => {
	console.log("server listening on port 4000");
})