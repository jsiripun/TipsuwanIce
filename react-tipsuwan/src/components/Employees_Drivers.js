import React, { Component } from 'react';
import { FormGroup, Form, Grid, ControlLabel, FormControl, Table, Tab, Row, Col, Nav, NavItem, Glyphicon, Button, Jumbotron } from 'react-bootstrap';

class Employees_Drivers extends Component {
/*
======================== DRIVER EMPLOYEE SECTION =========================
*/	
	constructor(props) {
		super(props);
			this.state = {
			drivers: [],
			driver: {
				driverID: '',
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
		this.getDrivers();
	}
	
	getDrivers = _ => {
		fetch('http://localhost:4000/drivers')
			.then(response => response.json())
			.then(response => {this.setState({drivers: response.data});})		
			.catch(err => console.error(err));
	}
	
	
	renderDrivers = (driver, index) => {
		
		let activeValue = false;
		
		if(driver.active === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{driver.driverID}</td>
			  <td>{driver.firstName}</td>
			  <td>{driver.lastName}</td>
			  <td>{driver.email}</td>
			  <td>{driver.phoneNumber}</td>
			  <td><input type="checkbox" readOnly checked={activeValue} /></td>
			</tr>
			);
	}
	
	handleSelect(key) {
		// refresh when going back to view
		if(key === "view") {
			this.getDrivers();
		}
		this.setState({ key });
  }
	
/*
======================== ADD DRIVER SECTION =========================
*/
  
	renderAddForm = (driver) => {
		return (
			<Form horizontal>

			  <FormGroup >
				<Col componentClass={ControlLabel} sm={2}>
				  First Name *
				</Col>
				<Col sm={3}>
				  <FormControl type="firstName" 
					placeholder="First Name" 
					onChange={e => this.setState({driver: {...driver, firstName: e.target.value}})}
					/>
				</Col>
				<Col componentClass={ControlLabel} sm={2}>
				  Last Name *
				</Col>
				<Col sm={3}>
				  <FormControl type="lastName" 
					placeholder="Last Name" 
					onChange={e => this.setState({driver: {...driver, lastName: e.target.value}})}
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
					onChange={e => this.setState({driver: {...driver, email: e.target.value}})}
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
					onChange={e => this.setState({driver: {...driver, phoneNumber: e.target.value}})}
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
					   this.setState({driver: {...driver, active: isActive}})}
					}
				   />
				</Col>
			  </FormGroup>
			  
			  <FormGroup>
				<Col smOffset={2} sm={6}> 
				  <Button onClick={this.addDriver} type="submit">Add Driver</Button>
				</Col>
			  </FormGroup>
			</Form>
		);
	}
	
	addDriver = _ => {
		const { driver } = this.state;
		
		// ensure that all required sections are filled out
		if (!driver.firstName) {
			alert("First Name is required.");
			return;
		} else if (!driver.lastName) {
			alert("Last Name is required.");
			return;
		}
		
		fetch(`http://localhost:4000/drivers/add?active=${driver.active}&firstName=${driver.firstName}&lastName=${driver.lastName}&email=${driver.email}&phoneNumber=${driver.phoneNumber}`)
			.then(this.getDrivers)
			.catch(err => console.error(err));
			
		
		alert(`Driver (${driver.firstName} ${driver.lastName}) added successfully`);
	}
	
/*
======================== MODIFY DRIVER SECTION =========================
*/

	modifyDriver = (driver) => {
		
		
		fetch(`http://localhost:4000/drivers/modify?driverID=${driver.driverID}&active=${driver.active}&firstName=${driver.firstName}&lastName=${driver.lastName}&email=${driver.email}&phoneNumber=${driver.phoneNumber}`)
			.then(this.getDrivers)
			.catch(err => console.error(err));
		
		alert(`Driver (${driver.firstName} ${driver.lastName}) modified successfully`);
		
	}
	
	handleChangeFirstName (e, index) {
		let tempEmp = this.state.drivers;
		tempEmp[index].firstName = e.target.value;
		this.setState({driver: this.state.drivers[index],
					   drivers: tempEmp});
	}
	
	handleChangeLastName (e, index) {
		let tempEmp = this.state.drivers;
		tempEmp[index].lastName = e.target.value;
		this.setState({driver: this.state.drivers[index],
					   drivers: tempEmp});
	}
	
	handleChangeEmail (e, index) {
		let tempEmp = this.state.drivers;
		tempEmp[index].email = e.target.value;
		this.setState({driver: this.state.drivers[index],
					   drivers: tempEmp});
	}
	
	handleChangePhoneNumber (e, index) {
		let tempEmp = this.state.drivers;
		tempEmp[index].phoneNumber = e.target.value;
		this.setState({driver: this.state.drivers[index],
					   drivers: tempEmp});
	}
	
	handleChangeActive (e, index) {
		let tempEmp = this.state.drivers;
		
		let isActive = 1;
	    if(e.target.checked === false) 
			{isActive = 0}
	  
		tempEmp[index].active = isActive;
		this.setState({driver: this.state.drivers[index],
					   drivers: tempEmp});
	}
	
	handleSaveDriver (index) {
		this.setState({driver: this.state.drivers[index]}, () => {this.modifyDriver(this.state.driver)});
		
	}
	
	deleteDriver = (rowId) => {
	const removed = this.state.drivers.splice(rowId, 1);
	
	
	fetch(`http://localhost:4000/drivers/delete?driverID=${removed[0].driverID}`)
			.then(this.getDrivers)
			.catch(err => console.error(err));
	
	}
	
	renderModifyDrivers = (driver, index) => {
		
		let activeValue = false;
		if(this.state.drivers[index].active === 1) {
			activeValue = true;
		}
		
		return (
			<tr key={index}>
			  <td>{driver.driverID}</td>
			  <td><input type="text" name="firstName" value={this.state.drivers[index].firstName} onChange={e => {this.handleChangeFirstName(e, index)}}></input></td>
			  <td><input type="text" name="lastName" value={this.state.drivers[index].lastName} onChange={e => {this.handleChangeLastName(e, index)}}></input></td>
			  <td><input type="text" name="email" value={this.state.drivers[index].email} onChange={e => {this.handleChangeEmail(e, index)}}></input></td>
			  <td><input type="text" name="phoneNumber" value={this.state.drivers[index].phoneNumber} onChange={e => {this.handleChangePhoneNumber(e, index)}}></input></td>
			  <td><input type="checkbox" 
					checked={activeValue}
				    onChange={e => {this.handleChangeActive(e, index)}
					}
				   /></td>
			  <td><div className="save">
				<a onClick={() => {
				let r = window.confirm(`Are you sure you want to save Driver (${driver.firstName} ${driver.lastName})?`);
					if (r === true) {
						this.handleSaveDriver(index);
					}
				}}><Glyphicon glyph="floppy-disk" /></a></div>
				</td>
			  <td><div className="remove">
				<a onClick={() => {let r = window.confirm(`Are you sure you want to delete Driver (${driver.firstName} ${driver.lastName})?`);
					if (r === true) {
						this.deleteDriver(index);
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
		const { drivers , driver } = this.state;
		
		return (
			<div className="Driver">
				<Jumbotron className="titleJumbotron"> DRIVER EMPLOYEES </Jumbotron>
				<Grid fluid={true}>
					<Tab.Container id="left-tabs" activeKey={this.state.key} onSelect={this.handleSelect}>
					  <Row className="clearfix" >
						<Col sm={2}>
						  <Nav bsStyle="pills" stacked >
							<NavItem eventKey="view">View Drivers</NavItem>
							<NavItem eventKey="add">Add Drivers</NavItem>
							<NavItem eventKey="modify">Modify Drivers</NavItem>
						  </Nav>
						</Col>
						<Col sm={10}>
						  <Tab.Content animation>
							<Tab.Pane eventKey="view">
								<div>
									<Table striped bordered condensed hover responsive>
									  <thead>
										<tr>
										  <th>Driver ID</th>
										  <th>First Name</th>
										  <th>Last Name</th>
										  <th>Email</th>
										  <th>Phone Number</th>
										  <th>Active</th>
										</tr>
									  </thead>
									  <tbody>
										{drivers.map(this.renderDrivers)}
									  </tbody>
									</Table>
								</div>
							</Tab.Pane>
							<Tab.Pane eventKey="add">
								<div>
									 {this.renderAddForm(driver)}
								</div>
							
							</Tab.Pane>
							<Tab.Pane eventKey="modify">
								<div>
									<Table striped bordered condensed hover responsive>
									  <thead>
										<tr>
										  <th>Driver ID</th>
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
										{drivers.map(this.renderModifyDrivers)}
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

export default Employees_Drivers;