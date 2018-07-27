import React, { Component } from 'react';
import { FormGroup, Form, Grid, Checkbox, ControlLabel, FormControl, HelpBlock, Table, Tab, Row, Col, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap';

class Employees extends Component {
/*
======================== GENERAL EMPLOYEE SECTION =========================
*/	
	constructor(props) {
		super(props);
			this.state = {
			employees: [],
			employee: {
				loginID: '',
				password: '',
				active: 1,
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
			},
			key: "view"
		}
		this.handleSelect = this.handleSelect.bind(this);
	}
	
	componentDidMount() {
		this.getEmployees();
	}
	
	getEmployees = _ => {
		fetch('http://localhost:4000/employees')
			.then(response => response.json())
			.then(response => {this.setState({employees: response.data});})		
			.catch(err => console.error(err));
	}
	
	
	renderEmployees = (employee, index) => {
		
		const {empArray} = this.state.employees;
		let activeValue = false;
		
		if(employee.active === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{employee.loginID}</td>
			  <td>{employee.firstName}</td>
			  <td>{employee.lastName}</td>
			  <td>{employee.email}</td>
			  <td>{employee.phoneNumber}</td>
			  <td><input type="checkbox" readOnly checked={activeValue} /></td>
			</tr>
			);
	}
	
	handleSelect(key) {
		// refresh when going back to view
		if(key === "view") {
			this.getEmployees();
		}
		this.setState({ key });
  }
	
/*
======================== ADD EMPLOYEE SECTION =========================
*/
  
	renderAddForm = (employee) => {
		return (
			<Form horizontal>
			  <FormGroup controlId="formHorizontalLoginID">
				<Col componentClass={ControlLabel} sm={2}>
				  Login ID *
				</Col>
				<Col sm={3}>
				  <FormControl type="loginID" 
					placeholder="Login ID"
					onChange={e => this.setState({employee: {...employee, loginID: e.target.value}})}/>
				</Col>
				<Col componentClass={ControlLabel} sm={2}>
				  Password *
				</Col>
				<Col sm={3}>
				  <FormControl type="password" 
					placeholder="Password"
					onChange={e => this.setState({employee: {...employee, password: e.target.value}})}/>
				</Col>
			  </FormGroup>

			  <FormGroup controlId="formHorizontalName">
				<Col componentClass={ControlLabel} sm={2}>
				  First Name *
				</Col>
				<Col sm={3}>
				  <FormControl type="firstName" 
					placeholder="First Name" 
					onChange={e => this.setState({employee: {...employee, firstName: e.target.value}})}
					/>
				</Col>
				<Col componentClass={ControlLabel} sm={2}>
				  Last Name *
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
				<Col sm={1}>
				   <input type="checkbox" 
				   defaultChecked="true"
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
		);
	}
	
	addEmployee = _ => {
		const { employee } = this.state;
		let empExists = this.state.employees.some( emp => emp['loginID'] === employee.loginID );
		
		if (empExists) {
			alert (`Login ID (${employee.loginID}) already exists, please choose a different Login ID`);
			return;
		}
		
		// ensure that all required sections are filled out
		if (!employee.loginID) {
			alert("Login ID is required.");
			return;
		} else if (!employee.password) {
			alert("Password is required.");
			return;
		} else if (!employee.firstName) {
			alert("First Name is required.");
			return;
		} else if (!employee.lastName) {
			alert("Last Name is required.");
			return;
		}
		
		fetch(`http://localhost:4000/employees/add?loginID=${employee.loginID}&password=${employee.password}&active=${employee.active}&firstName=${employee.firstName}&lastName=${employee.lastName}&email=${employee.email}&phoneNumber=${employee.phoneNumber}`)
			.then(this.getEmployees)
			.catch(err => console.error(err));
			
		
		alert(`Employee (${employee.loginID}) added successfully`);
	}
	
/*
======================== MODIFY EMPLOYEE SECTION =========================
*/

	modifyEmployee = (employee) => {
		
		
		fetch(`http://localhost:4000/employees/modify?loginID=${employee.loginID}&password=${employee.password}&active=${employee.active}&firstName=${employee.firstName}&lastName=${employee.lastName}&email=${employee.email}&phoneNumber=${employee.phoneNumber}`)
			.then(this.getEmployees)
			.catch(err => console.error(err));
		
		alert(`Employee (${employee.loginID}) modified successfully`);
		
	}
	
	handleChangeFirstName (e, index) {
		let tempEmp = this.state.employees;
		tempEmp[index].firstName = e.target.value;
		this.setState({employee: this.state.employees[index],
					   employees: tempEmp});
	}
	
	handleChangeLastName (e, index) {
		let tempEmp = this.state.employees;
		tempEmp[index].lastName = e.target.value;
		this.setState({employee: this.state.employees[index],
					   employees: tempEmp});
	}
	
	handleChangeEmail (e, index) {
		let tempEmp = this.state.employees;
		tempEmp[index].email = e.target.value;
		this.setState({employee: this.state.employees[index],
					   employees: tempEmp});
	}
	
	handleChangePhoneNumber (e, index) {
		let tempEmp = this.state.employees;
		tempEmp[index].phoneNumber = e.target.value;
		this.setState({employee: this.state.employees[index],
					   employees: tempEmp});
	}
	
	handleChangeActive (e, index) {
		let tempEmp = this.state.employees;
		
		let isActive = 1;
	    if(e.target.checked === false) 
			{isActive = 0}
	  
		tempEmp[index].active = isActive;
		this.setState({employee: this.state.employees[index],
					   employees: tempEmp});
	}
	
	handleSaveEmployee (index) {
		this.setState({employee: this.state.employees[index]}, () => {this.modifyEmployee(this.state.employee)});
		
	}
	
	deleteEmployee = (rowId) => {
    const arrayCopy = this.state.employees;
	const removed = this.state.employees.splice(rowId, 1);
	
	
	fetch(`http://localhost:4000/employees/delete?loginID=${removed[0].loginID}`)
			.then(this.getEmployees)
			.catch(err => console.error(err));
	
	}
	
	renderModifyEmployees = (employee, index) => {
		
		let activeValue = false;
		if(this.state.employees[index].active === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{employee.loginID}</td>
			  <td><input type="text" name="firstName" value={this.state.employees[index].firstName} onChange={e => {this.handleChangeFirstName(e, index)}}></input></td>
			  <td><input type="text" name="lastName" value={this.state.employees[index].lastName} onChange={e => {this.handleChangeLastName(e, index)}}></input></td>
			  <td><input type="text" name="email" value={this.state.employees[index].email} onChange={e => {this.handleChangeEmail(e, index)}}></input></td>
			  <td><input type="text" name="phoneNumber" value={this.state.employees[index].phoneNumber} onChange={e => {this.handleChangePhoneNumber(e, index)}}></input></td>
			  <td><input type="checkbox" 
					checked={activeValue}
				    onChange={e => {this.handleChangeActive(e, index)}
					}
				   /></td>
			  <td><div className="save">
				<a href="#" onClick={() => {
				let r = window.confirm(`Are you sure you want to save ${employee.loginID}?`);
					if (r == true) {
						this.handleSaveEmployee(index);
					}
				}}><Glyphicon glyph="floppy-disk" /></a></div>
				</td>
			  <td><div className="remove">
				<a href="#" onClick={() => {let r = window.confirm(`Are you sure you want to delete ${employee.loginID}?`);
					if (r == true) {
						this.deleteEmployee(index)
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
		const { employees , employee } = this.state;
		
		return (
			<div className="Employee">
				<div><br />EMPLOYEES PAGE<br /><br /></div>
				
				<Grid fluid={true}>
					<Tab.Container id="left-tabs" activeKey={this.state.key} onSelect={this.handleSelect}>
					  <Row className="clearfix" >
						<Col sm={3}>
						  <Nav bsStyle="pills" stacked >
							<NavItem eventKey="view">View Employees</NavItem>
							<NavItem eventKey="add">Add Employees</NavItem>
							<NavItem eventKey="modify">Modify Employees</NavItem>
						  </Nav>
						</Col>
						<Col sm={9}>
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
									 {this.renderAddForm(employee)}
								</div>
							
							</Tab.Pane>
							<Tab.Pane eventKey="modify">
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
										  <th>Save</th>
										  <th>Delete</th>
										</tr>
									  </thead>
									  <tbody>
										{employees.map(this.renderModifyEmployees)}
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

export default Employees;