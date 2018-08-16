const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db_conn.js');

const SELECT_ALL_CUSTOMERS_QUERY = "SELECT * FROM customers";

router.use(cors());

router.get('/', (req, res) => {
	connection.query(SELECT_ALL_CUSTOMERS_QUERY, (err, results) => {
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
	connection.query(INSERT_CUSTOMERS_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully added customers');
		}
	});
});

router.get('/modify', (req, res) => {
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
	const MODIFY_CUSTOMER_QUERY = `UPDATE customers SET active= ${active}, firstName='${firstName}', lastName='${lastName}', email='${email}', phoneNumber='${phoneNumber}', outstandingMoneyBalance='${outstandingMoneyBalance}', outstandingBagBalance='${outstandingBagBalance}' WHERE customerID = '${customerID}'`;
	connection.query(MODIFY_CUSTOMER_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully modified roles');
		}
	});
});

router.get('/delete', (req, res) => {
	let {customerID} = req.query;
	const DELETE_CUSTOMER_QUERY = `DELETE FROM customers WHERE customerID = '${customerID}'`;
	connection.query(DELETE_CUSTOMER_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully deleted employees');
		}
	});
});

module.exports = router