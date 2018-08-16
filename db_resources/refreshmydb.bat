DROP DATABASE IF EXISTS db_tipsuwan;
CREATE DATABASE db_tipsuwan;
USE db_tipsuwan;


CREATE TABLE Employees (
    loginID  VARCHAR(20) NOT NULL PRIMARY KEY,   
    password VARCHAR(50) NOT NULL,
    active bit NOT NULL,			-- always set it to "Active" (=1) for now			
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    phoneNumber VARCHAR(20)
    );
    
CREATE TABLE Customers (
    customerID  INT(20) NOT NULL PRIMARY KEY,   
    active bit NOT NULL,			-- always set it to "Active" (=1) for now			
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    phoneNumber VARCHAR(20),
    outstandingMoneyBalance FLOAT(25, 2) NOT NULL,
    outstandingBagBalance INT(20) NOT NULL
    );

CREATE TABLE Drivers(
    driverID  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    active bit NOT NULL,			-- always set it to "Active" (=1) for now			
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    phoneNumber VARCHAR(20)
    );

CREATE TABLE Inventory(
    inventoryID  INT(20) NOT NULL PRIMARY KEY,   
    active bit NOT NULL,			-- always set it to "Active" (=1) for now			
    name VARCHAR(50) NOT NULL,
    price FLOAT(25, 2) NOT NULL,
    quantity INT(20) NOT NULL
    );


CREATE TABLE Invoices (
        
	invoiceID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

        customerID INT(20) NOT NULL,
        bagsTaken INT UNSIGNED NOT NULL,

        bagsReturned INT UNSIGNED NOT NULL,

        amountDue DOUBLE PRECISION NOT NULL,

        amountPaid DOUBLE PRECISION NOT NULL,

        status VARCHAR(25) NOT NULL,		--  Values: UNPAID, PAID, DELETED <-- invoice life cycle

        driverID INT UNSIGNED NOT NULL,

        shipmentNum INT UNSIGNED NOT NULL, -- (Ga)

        invoiceDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,		-- Insert: current timestamp.  Update: No effect.

        index invoice_customer_index(customerID),


	index invoice_driver_index(driverID),
        CONSTRAINT customer_foreign_key FOREIGN KEY (customerID) references customers(customerID),


        CONSTRAINT driver_foreign_key FOREIGN KEY (driverID) references customers(driverID)
);

CREATE TABLE Invoice_Details (

        invoiceDetailsID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

        invoiceID INT UNSIGNED NOT NULL,

        inventoryID INT UNSIGNED NOT NULL,

        quantity INT UNSIGNED NOT NULL,

        amount DOUBLE PRECISION NOT NULL,	-- amount = quantity * inventory price

        index invoiceDetails_invoice_index(`invoiceID`),

  	foreign key (`invoiceID`) references invoices(`invoiceID`) on delete cascade
   
);
    
CREATE TABLE Roles (
    -- Valid roles are:
    --   1. "Sale"
    --		a. Create, View, Print Invoice (can not update or delete)
    --		b. CURD Customer Records
    --   2. "Accounting" 
    --		a. CURD Expenses
    --		b. View/Print Expense Report
    --		c. View/Print Driver Report
    --		d. View/Print Invoices Report (=Sale Report)
    --		e. View/Print Customer With Outstanding Balance Report
    --   3. "Admin"
    --		a. CURD/Print Invoice
    --		b. Update/View Inventory
    --		c. View/Print Driver Report
    --		d. View/Print Sale Report
    --		f. View/Print  Customer With Outstanding Balance Report
    --   4. "SuperAdmin"
    --		a. Perform all operations above
    --		b. CURD Users (e.g., change user role, add/delete users)
    --   5. "Others"   Can not even login (hence cannot perform any operations, e.g., driver)
	role_name varchar(20) NOT NULL PRIMARY KEY
);

CREATE TABLE Employees_Roles (
	loginID varchar(20) NOT NULL,
	role_name varchar(20) NOT NULL,
	PRIMARY KEY (loginID, role_name),
	CONSTRAINT Employees_Roles_foreign_key_1 FOREIGN KEY (loginID) REFERENCES Employees (loginID),
	CONSTRAINT Employees_Roles_foreign_key_2 FOREIGN KEY (role_name) REFERENCES Roles (role_name)
);

    
-- TBD: Invoice, Inventory, Customer Expense Table    

  
insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('sale1', 'sale1pass', 1, 'Sale1FN', 'Sale1LN', '', '');
insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('acct1', 'acct1pass', 1, 'Acct1FN', 'Acct1LN', '', '');
insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('admin1', 'admin1pass', 1, 'Admin1FN', 'Admin1LN', '', '');
insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('superadmin1', 'superadmin1pass', 1, 'SuperAdmin1FN', 'SuperAdmin1LN', '', '');
insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('other1', 'other1pass', 1, 'Other1FN', 'Other1LN', '', '');
-- insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('john', 'johnpass', 1, 'JohnFN', 'JohnLN');
-- insert into Employees (loginID, PASSWORD, ACTIVE, firstName, lastName, email, phoneNumber) values ('jane', 'janepass', 1, 'JaneFN', 'JaneLN');


insert into Customers (customerID, ACTIVE, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance) values ('1', 1, 'Fran', 'Drescher', '', '' 0, 0);
insert into Customers (customerID, ACTIVE, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance) values ('2', 1, 'Jack', 'Ripper', '', '', 0, 0);
insert into Customers (customerID, ACTIVE, firstName, lastName, email, phoneNumber, outstandingMoneyBalance, outstandingBagBalance) values ('3', 1, 'Hurricane', 'Katrina', '', '', 0, 0);


insert into Drivers (ACTIVE, firstName, lastName, email, phoneNumber) values (1, 'Hoke', 'Daisy', 'email@email.com', '1234567');
insert into Drivers (ACTIVE, firstName, lastName, email, phoneNumber) values (1, 'Lady', 'Who', 'lady@email.com', '1288897');
insert into Drivers (ACTIVE, firstName, lastName, email, phoneNumber) values (1, 'Boruto', 'Uzumaki', 'believe@it2.com', '44444455');


INSERT INTO Roles (role_name) VALUES ('Sale');
INSERT INTO Roles (role_name) VALUES ('Accounting');
INSERT INTO Roles (role_name) VALUES ('Admin');
INSERT INTO Roles (role_name) VALUES ('SuperAdmin');
INSERT INTO Roles (role_name) VALUES ('Others');


INSERT INTO Employees_Roles (loginID, role_name) VALUES ('sale1', 'Sale');
INSERT INTO Employees_Roles (loginID, role_name) VALUES ('acct1', 'Accounting');
INSERT INTO Employees_Roles (loginID, role_name) VALUES ('admin1', 'Admin');
INSERT INTO Employees_Roles (loginID, role_name) VALUES ('superadmin1', 'SuperAdmin');
INSERT INTO Employees_Roles (loginID, role_name) VALUES ('other1', 'Others');


INSERT INTO Inventory (inventoryID, active, name, price, quantity) values (1, 1, 'Small Cubes', 10, 100);

INSERT INTO Inventory (inventoryID, active, name, price, quantity) values (2, 1, 'Large Cubes', 15, 180);

INSERT INTO Inventory (inventoryID, active, name, price, quantity) values (3, 1, 'Chips', 8, 90);

INSERT INTO Inventory (inventoryID, active, name, price, quantity) values (4, 1, 'Block', 60, 50);
