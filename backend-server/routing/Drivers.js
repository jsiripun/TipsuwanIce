const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db_conn.js');

const SELECT_ALL_CUSTOMERS_QUERY = "SELECT * FROM drivers";

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
	let { active, firstName, lastName, email, phoneNumber } = req.query;
	console.log( active, firstName, lastName, email, phoneNumber);
	if (typeof active === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' ) {
		return res.send("Need to enter driverID, active, firstName, lastName");
	}
	if (typeof email === 'undefined') {
		email = "";
	}
	if (typeof phoneNumber === 'undefined') {
		phoneNumber = "";
	}
	const INSERT_DRIVERS_QUERY = `INSERT INTO drivers (active, firstName, lastName, email, phoneNumber) VALUES ( ${active}, '${firstName}', '${lastName}', '${email}', '${phoneNumber}')`;
	connection.query(INSERT_DRIVERS_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully added driver');
		}
	});
});

router.get('/modify', (req, res) => {
	let { driverID, active, firstName, lastName, email, phoneNumber } = req.query;
	console.log(driverID, active, firstName, lastName, email, phoneNumber);
	if (typeof driverID === 'undefined' || typeof active === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' ) {
		return res.send("Need to enter driverID, active, firstName, lastName");
	}
	if (typeof email === 'undefined') {
		email = "";
	}
	if (typeof phoneNumber === 'undefined') {
		phoneNumber = "";
	}
	const MODIFY_DRIVER_QUERY = `UPDATE drivers SET active= ${active}, firstName='${firstName}', lastName='${lastName}', email='${email}', phoneNumber='${phoneNumber}' WHERE driverID = '${driverID}'`;
	connection.query(MODIFY_DRIVER_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully modified driver');
		}
	});
});

router.get('/delete', (req, res) => {
	let {driverID} = req.query;
	const DELETE_DRIVER_QUERY = `DELETE FROM drivers WHERE driverID = '${driverID}'`;
	connection.query(DELETE_DRIVER_QUERY, (err, results) => {
		if(err) {
			res.status(400);
			return res.send(err);
		} else {
			return res.send('successfully deleted driver');
		}
	});
});

module.exports = router