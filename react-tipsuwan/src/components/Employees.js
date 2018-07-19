import React, { Component } from 'react';
import { FormGroup, Form, Checkbox, ControlLabel, FormControl, HelpBlock, Table, Tab, Row, Col, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap';

class Employees extends Component {
	
	state = {
		employees: [],
		employee: {
			loginID: 'sample_employee',
			password: 'password',
			active: 1,
			firstName: 'first_name',
			lastName: 'last_name',
			email: 'email',
			phoneNumber: '123-456-7890',
		}
	}
	
	componentDidMount() {
		this.getEmployees();
	}
	
	getEmployees = _ => {
		fetch('http://localhost:4000/employees')
			.then(response => response.json())
			.then(response => this.setState({employees: response.data}))
			.catch(err => console.error(err));
	}
	
	
	renderEmployees = (employee, index) => {
		const {empArray} = this.state.employees;
		let activeValue = false;
		
		if(employee.active.data[0] === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{employee.loginID}</td>
			  <td>{employee.firstName}</td>
			  <td>{employee.lastName}</td>
			  <td>{employee.email}</td>
			  <td>{employee.phoneNumber}</td>
			  <td><input type="checkbox" checked={activeValue} /></td>
			  <td><div className="remove">
				<a href="#" onClick={() => this.deleteEmployee(index)}><Glyphicon glyph="remove" /></a></div>
				</td>
			</tr>
			);
	}
	
	deleteEmployee = (rowId) => {
    const arrayCopy = this.state.employees;
	const removed = this.state.employees.splice(rowId, 1);
	
	fetch(`http://localhost:4000/employees/delete?loginID=${removed[0].loginID}`)
			.then(this.getEmployees)
			.catch(err => console.error(err));
	
  };
	
	addEmployee = _ => {
		const { employee } = this.state;
		let empExists = this.state.employees.some( emp => emp['loginID'] === employee.loginID );
		
		if (empExists) {
			alert (`Login ID (${employee.loginID}) already exists, please choose a different Login ID`);
			return;
		}
		
		fetch(`http://localhost:4000/employees/add?loginID=${employee.loginID}&password=${employee.password}&active=${employee.active}&firstName=${employee.firstName}&lastName=${employee.lastName}&email=${employee.email}&phoneNumber=${employee.phoneNumber}`)
			.then(this.getEmployees)
			.catch(err => console.error(err));
			
		
		alert(`Employee (${employee.loginID}) added successfully`);
	}
	
	
	modifyEmployee = _ => {
		const { employee } = this.state;
		let empExists = this.state.employees.some( emp => emp['loginID'] === employee.loginID );
		
		if (!empExists) {
			alert ("This employee does not exist");
		}
		
		fetch(`http://localhost:4000/employees/modify?loginID=${employee.loginID}&password=${employee.password}&active=${employee.active}&firstName=${employee.firstName}&lastName=${employee.lastName}&email=${employee.email}&phoneNumber=${employee.phoneNumber}`)
			.then(this.getEmployees)
			.catch(err => console.error(err));
		
		
	}
	
	
	render() {
		const { employees , employee } = this.state;
		
		return (
			<div className="Employee">
				<div><br />EMPLOYEES PAGE<br /><br /></div>
				
				<Tab.Container id="left-tabs" defaultActiveKey="view">
				  <Row className="clearfix">
					<Col sm={4}>
					  <Nav bsStyle="pills" stacked>
						<NavItem eventKey="view">View Employees</NavItem>
						<NavItem eventKey="add">Add Employees</NavItem>
					  </Nav>
					</Col>
					<Col sm={8}>
					  <Tab.Content animation>
						<Tab.Pane eventKey="view">
							<div>
								<Table striped bordered condensed hover responsive>
								  <thead>
									<tr>
									  <th>Username</th>
									  <th>First Name</th>
									  <th>Last Name</th>
									  <th>Email</th>
									  <th>Phone Number</th>
									  <th>Active</th>
									  <th>Delete</th>
									</tr>
								  </thead>
								  <tbody>
									{employees.map(this.renderEmployees)}
								  </tbody>
								</Table>
							</div>
						</Tab.Pane>
						<Tab.Pane eventKey="add">
							<div>
								
								<button onClick={this.addEmployee}>Add New Employee</button>
								<button onClick={this.modifyEmployee}>Modify Employee</button>
								 
								<Form horizontal>
								  <FormGroup controlId="formHorizontalLoginID">
									<Col componentClass={ControlLabel} sm={2}>
									  Login ID
									</Col>
									<Col sm={3}>
									  <FormControl type="loginID" 
										placeholder="Login ID"
										onChange={e => this.setState({employee: {...employee, loginID: e.target.value}})}/>
									</Col>
									<Col componentClass={ControlLabel} sm={2}>
									  Password
									</Col>
									<Col sm={3}>
									  <FormControl type="password" 
										placeholder="Password"
										onChange={e => this.setState({employee: {...employee, password: e.target.value}})}/>
									</Col>
								  </FormGroup>

								  <FormGroup controlId="formHorizontalName">
									<Col componentClass={ControlLabel} sm={2}>
									  First Name
									</Col>
									<Col sm={3}>
									  <FormControl type="firstName" 
										placeholder="First Name" 
										onChange={e => this.setState({employee: {...employee, firstName: e.target.value}})}
										/>
									</Col>
									<Col componentClass={ControlLabel} sm={2}>
									  Last Name
									</Col>
									<Col sm={3}>
									  <FormControl type="lastName" 
										placeholder="Last Name" 
										onChange={e => this.setState({employee: {...employee, lastName: e.target.value}})}
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
										onChange={e => this.setState({employee: {...employee, email: e.target.value}})}
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
										onChange={e => this.setState({employee: {...employee, phoneNumber: e.target.value}})}
										/>
									</Col>
								  </FormGroup>
								  
								  <FormGroup controlId="formHorizontalActive">
									<Col componentClass={ControlLabel} sm={2}>
									  Active
									</Col>
									<Col sm={6}>
									   <input type="checkbox" 
									   onChange={e => { 
										   let isActive = 1;
										   if(e.target.checked === false) {isActive = 0}
										   this.setState({employee: {...employee, active: isActive}})}
										}
									   />
									</Col>
								  </FormGroup>

								  <FormGroup>
									<Col smOffset={2} sm={6}>
									  <Button onClick={this.addEmployee} type="submit">Add Employee</Button>
									</Col>
								  </FormGroup>
								</Form>
							</div>
						
						</Tab.Pane>
					  </Tab.Content>
					</Col>
				  </Row>
				</Tab.Container>
				
				
				
				
				
				
			</div>
		)
	}
}

export default Employees;