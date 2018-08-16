const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db_conn.js');


const SELECT_ALL_ROLES_QUERY = "SELECT * FROM roles";

router.use(cors());


router.get('/', (req, res) => {
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

router.get('/add', (req, res) => {
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

router.get('/delete', (req, res) => {
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

module.exports = router