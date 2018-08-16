const express = require('express');
const roles = require('./routing/Roles.js');
const employees = require('./routing/Employees.js');
const customers = require('./routing/Customers.js');

const app = express();

app.get('/', (req, res) => {
	let message = "go to /roles for roles ---- go to /employee for employees --- go to /customers for customers";
	res.send(message);
});

/*
======================== ROLES =========================
-- find more details in /routing/roles.js
*/

app.use('/roles', roles)

/*
======================== EMPLOYEES =========================
-- find more details in /routing/employees.js
*/
app.use('/employees', employees)

/*
======================== CUSTOMERS =========================
-- find more details in /routing/customers.js
*/
app.use('/customers', customers)


app.listen(4000, () => {
	console.log("server listening on port 4000");
})