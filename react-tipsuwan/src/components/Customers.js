import React, { Component } from 'react';
import { FormGroup, Form, Grid, Checkbox, ControlLabel, FormControl, HelpBlock, Table, Tab, Row, Col, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap';
import './Customers.css';

class Customers extends Component {
/*
======================== GENERAL CUSTOMER SECTION =========================
*/	
	constructor(props) {
		super(props);
			this.state = {
			customers: [],
			customer: {
				customerID: 0,
				active: 1,
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				outstandingMoneyBalance: 0.0,
				outstandingBagBalance: 0,
			},
			key: "view"
		}
		this.handleSelect = this.handleSelect.bind(this);
	}
	
	componentDidMount() {
		this.getCustomers();
	}
	
	getCustomers = _ => {
		fetch('http://localhost:4000/customers')
			.then(response => response.json())
			.then(response => {this.setState({customers: response.data});})		
			.catch(err => console.error(err));
	}
	
	
	renderCustomers = (customer, index) => {
		
		const {cusArray} = this.state.customers;
		let activeValue = false;
		
		if(customer.active === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{customer.customerID}</td>
			  <td>{customer.firstName}</td>
			  <td>{customer.lastName}</td>
			  <td>{customer.email}</td>
			  <td>{customer.phoneNumber}</td>
			  <td>{customer.outstandingMoneyBalance}</td>
			  <td>{customer.outstandingBagBalance}</td>
			  <td><input type="checkbox" readOnly checked={activeValue} /></td>
			</tr>
			);
	}
	
	handleSelect(key) {
		// refresh when going back to view
		if(key === "view") {
			this.getCustomers();
		}
		this.setState({ key });
  }

	
/*
======================== ADD CUSTOMER SECTION =========================
*/
  
	renderAddForm = (customer) => {
		return (
			<Form horizontal>
			  <FormGroup controlId="formHorizontalLoginID">
				<Col componentClass={ControlLabel} sm={2}>
				  Customer ID *
				</Col>
				<Col sm={3}>
				  <FormControl type="customerID" 
					placeholder="Customer ID"
					onChange={e => this.setState({customer: {...customer, customerID: e.target.value}})}/>
				</Col>
			  </FormGroup>

			  <FormGroup controlId="formHorizontalName">
				<Col componentClass={ControlLabel} sm={2}>
				  First Name *
				</Col>
				<Col sm={3}>
				  <FormControl type="firstName" 
					placeholder="First Name" 
					onChange={e => this.setState({customer: {...customer, firstName: e.target.value}})}
					/>
				</Col>
				<Col componentClass={ControlLabel} sm={2}>
				  Last Name *
				</Col>
				<Col sm={3}>
				  <FormControl type="lastName" 
					placeholder="Last Name" 
					onChange={e => this.setState({customer: {...customer, lastName: e.target.value}})}
					/>
				</Col>
			  </FormGroup>
			  
			  <FormGroup controlId="formHorizontalEmail">
				<Col componentClass={ControlLabel} sm={2}>
				  Email
				</Col>
				<Col sm={6}>
				  <FormControl type="email" 
					placeholder="Email" 
					onChange={e => this.setState({customer: {...customer, email: e.target.value}})}
					/>
				</Col>
			  </FormGroup>
			  
			  <FormGroup controlId="formHorizontalPhoneNumber">
				<Col componentClass={ControlLabel} sm={2}>
				  Phone Number
				</Col>
				<Col sm={6}>
				  <FormControl type="phoneNumber" 
					placeholder="Phone Number" 
					onChange={e => this.setState({customer: {...customer, phoneNumber: e.target.value}})}
					/>
				</Col>
			  </FormGroup>
			  
			  <FormGroup controlId="formHorizontalOutstandingMoneyBalance">
				<Col componentClass={ControlLabel} sm={2}>
				  Outstanding Money Balance
				</Col>
				<Col sm={6}>
				  <FormControl type="outstandingMoneyBalance" 
					placeholder="0.0" 
					onChange={e => this.setState({customer: {...customer, outstandingMoneyBalance: e.target.value}})}
					/>
				</Col>
			  </FormGroup>
			  
			  <FormGroup controlId="formHorizontalOutstandingBagBalance">
				<Col componentClass={ControlLabel} sm={2}>
				  Outstanding Bag Balance
				</Col>
				<Col sm={6}>
				  <FormControl type="outstandingBagBalance" 
					placeholder="0" 
					onChange={e => this.setState({customer: {...customer, outstandingBagBalance: e.target.value}})}
					/>
				</Col>
			  </FormGroup>
			  
			  <FormGroup controlId="formHorizontalActive">
				<Col componentClass={ControlLabel} sm={2}>
				  Active
				</Col>
				<Col sm={1}>
				   <input type="checkbox" 
				   defaultChecked="true"
				   onChange={e => { 
					   let isActive = 1;
					   if(e.target.checked === false) {isActive = 0}
					   this.setState({customer: {...customer, active: isActive}})}
					}
				   />
				</Col>
			  </FormGroup>
			  
			  <FormGroup>
				<Col smOffset={2} sm={6}> 
				  <Button onClick={this.addCustomer} type="submit">Add Customer</Button>
				</Col>
			  </FormGroup>
			</Form>
		);
	}
	
	addCustomer = _ => {
		const { customer } = this.state;
		let cusExists = this.state.customers.some( cus => cus['customerID'] === customer.customerID );
		
		if (cusExists) {
			alert (`Customer ID (${customer.customerID}) already exists, please choose a different Customer ID`);
			return;
		}
		
		// ensure that all required sections are filled out
		if (!customer.customerID) {
			alert("Customer ID is required.");
			return;
		} else if (!customer.firstName) {
			alert("First Name is required.");
			return;
		} else if (!customer.lastName) {
			alert("Last Name is required.");
			return;
		}
		console.log(`http://localhost:4000/customers/add?customerID=${customer.customerID}&active=${customer.active}&firstName=${customer.firstName}&lastName=${customer.lastName}&email=${customer.email}&phoneNumber=${customer.phoneNumber}&outstandingMoneyBalance=${customer.outstandingMoneyBalance}&outstandingBagBalance=${customer.outstandingBagBalance}`);
		fetch(`http://localhost:4000/customers/add?customerID=${customer.customerID}&active=${customer.active}&firstName=${customer.firstName}&lastName=${customer.lastName}&email=${customer.email}&phoneNumber=${customer.phoneNumber}&outstandingMoneyBalance=${customer.outstandingMoneyBalance}&outstandingBagBalance=${customer.outstandingBagBalance}`)
			.then(this.getCustomers)
			.catch(err => console.error(err));
			
		
		alert(`Customer (${customer.customerID}) added successfully`);
	}

/*
======================== MODIFY CUSTOMER SECTION =========================
*/

	modifyCustomer = (customer) => {
		
		console.log(`http://localhost:4000/customers/modify?customerID=${customer.customerID}&active=${customer.active}&firstName=${customer.firstName}&lastName=${customer.lastName}&email=${customer.email}&phoneNumber=${customer.phoneNumber}&outstandingBagBalance=${customer.outstandingBagBalance}&outstandingMoneyBalance=${customer.outstandingMoneyBalance}`);
		fetch(`http://localhost:4000/customers/modify?customerID=${customer.customerID}&active=${customer.active}&firstName=${customer.firstName}&lastName=${customer.lastName}&email=${customer.email}&phoneNumber=${customer.phoneNumber}&outstandingBagBalance=${customer.outstandingBagBalance}&outstandingMoneyBalance=${customer.outstandingMoneyBalance}`)
			.then(this.getCustomers)
			.catch(err => console.error(err));
		
		alert(`Customer (${customer.customerID}) modified successfully`);
		
	}
	
	handleChangeFirstName (e, index) {
		let tempCus = this.state.customers;
		tempCus[index].firstName = e.target.value;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleChangeLastName (e, index) {
		let tempCus = this.state.customers;
		tempCus[index].lastName = e.target.value;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleChangeEmail (e, index) {
		let tempCus = this.state.customers;
		tempCus[index].email = e.target.value;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleChangePhoneNumber (e, index) {
		let tempCus = this.state.customers;
		tempCus[index].phoneNumber = e.target.value;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleChangeOutstandingMoneyBalance (e, index) {
		let tempCus = this.state.customers;
		tempCus[index].outstandingMoneyBalance = e.target.value;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleChangeOutstandingBagBalance (e, index) {
		let tempCus = this.state.customers;
		tempCus[index].outstandingBagBalance = e.target.value;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleChangeActive (e, index) {
		let tempCus = this.state.customers;
		
		let isActive = 1;
	    if(e.target.checked === false) 
			{isActive = 0}
	  
		tempCus[index].active = isActive;
		this.setState({customer: this.state.customers[index],
					   customers: tempCus});
	}
	
	handleSaveCustomer (index) {
		this.setState({customer: this.state.customers[index]}, () => {this.modifyCustomer(this.state.customer)});
		
	}
	
	deleteCustomer = (rowId) => {
    const arrayCopy = this.state.customers;
	const removed = this.state.customers.splice(rowId, 1);
	
	
	fetch(`http://localhost:4000/customers/delete?customerID=${removed[0].customerID}`)
			.then(this.getCustomers)
			.catch(err => console.error(err));
	
	}
	
	renderModifyCustomers = (customer, index) => {
		
		let activeValue = false;
		if(this.state.customers[index].active === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{customer.customerID}</td>
			  <td><input type="text" name="firstName" value={this.state.customers[index].firstName} onChange={e => {this.handleChangeFirstName(e, index)}}></input></td>
			  <td><input type="text" name="lastName" value={this.state.customers[index].lastName} onChange={e => {this.handleChangeLastName(e, index)}}></input></td>
			  <td><input type="text" name="email" value={this.state.customers[index].email} onChange={e => {this.handleChangeEmail(e, index)}}></input></td>
			  <td><input type="text" name="phoneNumber" value={this.state.customers[index].phoneNumber} onChange={e => {this.handleChangePhoneNumber(e, index)}}></input></td>
			  <td><input className="moneyModifyInput" type="number" name="outstandingMoneyBalance" value={this.state.customers[index].outstandingMoneyBalance} onChange={e => {this.handleChangeOutstandingMoneyBalance(e, index)}}></input></td>
			  <td><input className="bagModifyInput" type="number" name="outstandingBagBalance" value={this.state.customers[index].outstandingBagBalance} onChange={e => {this.handleChangeOutstandingBagBalance(e, index)}}></input></td>
			  <td><input type="checkbox" 
					checked={activeValue}
				    onChange={e => {this.handleChangeActive(e, index)}
					}
				   /></td>
			  <td><div className="save">
				<a href="#" onClick={() => {
				let r = window.confirm(`Are you sure you want to save Customer ID #${customer.customerID}?`);
					if (r == true) {
						this.handleSaveCustomer(index);
					}
				}}><Glyphicon glyph="floppy-disk" /></a></div>
				</td>
			  <td><div className="remove">
				<a href="#" onClick={() => {let r = window.confirm(`Are you sure you want to delete ${customer.customerID}?`);
					if (r == true) {
						this.deleteCustomer(index)
					}
					}}><Glyphicon glyph="remove" /></a></div>
				</td>
			</tr>
			);
	}
	
	
/*
======================== RENDER =========================
*/	
	
	render() {
		const { customers , customer } = this.state;
		
		return (
		<div className="Customers">
			<div><br />CUSTOMERS PAGE<br /><br /></div>
			
			<Grid fluid={true}>
					<Tab.Container id="left-tabs" activeKey={this.state.key} onSelect={this.handleSelect}>
					  <Row className="clearfix" >
						<Col sm={2}>
						  <Nav bsStyle="pills" stacked >
							<NavItem eventKey="view">View Customers</NavItem>
							<NavItem eventKey="add">Add Customers</NavItem>
							<NavItem eventKey="modify">Modify Customers</NavItem>
						  </Nav>
						</Col>
						<Col sm={10}>
						  <Tab.Content animation>
							<Tab.Pane eventKey="view">
								<div>
									<Table striped bordered condensed hover responsive>
									  <thead>
										<tr>
										  <th>Customer ID</th>
										  <th>First Name</th>
										  <th>Last Name</th>
										  <th>Email</th>
										  <th>Phone Number</th>
										  <th>Outstanding Money Balance</th>
										  <th>Outstanding Bag Balance</th>
										  <th>Active</th>
										</tr>
									  </thead>
									  <tbody>
										{customers.map(this.renderCustomers)}
									  </tbody>
									</Table>
								</div>
							</Tab.Pane>
							<Tab.Pane eventKey="add">
								<div>
									 {this.renderAddForm(customer)}
								</div>
							
							</Tab.Pane>
							<Tab.Pane eventKey="modify">
								<div>
									<Table striped bordered condensed hover responsive>
									  <thead>
										<tr>
										  <th>Customer ID</th>
										  <th>First Name</th>
										  <th>Last Name</th>
										  <th>Email</th>
										  <th>Phone Number</th>
										  <th>Outstanding Money Balance</th>
										  <th>Outstanding Bag Balance</th>
										  <th>Active</th>
										  <th>Save</th>
										  <th>Delete</th>
										</tr>
									  </thead>
									  <tbody>
										{customers.map(this.renderModifyCustomers)}
									  </tbody>
									</Table>
								</div>
							</Tab.Pane>
						  </Tab.Content>
						</Col>
					  </Row>
					</Tab.Container>
				</Grid>
			
		</div>
		)
	}
}

export default Customers;