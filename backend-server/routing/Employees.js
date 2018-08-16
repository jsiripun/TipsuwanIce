const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db_conn.js');


const SELECT_ALL_EMPLOYEES_QUERY = "SELECT * FROM employees";

router.use(cors());


router.get('/', (req, res) => {
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

router.get('/add', (req, res) => {
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

router.get('/modify', (req, res) => {
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

router.get('/delete', (req, res) => {
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

module.exports = router