import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Customers from './components/Customers.js';
import EmployeesDriver from './components/Employees_Drivers.js';
import EmployeesGeneral from './components/Employees_General.js';


class App extends Component {
	/*
	state = {
		roles: [],
		role: {
			role_name: 'sample_role',
		}
	}
	
	componentDidMount() {
		this.getRoles();
	}
	
	getRoles = _ => {
		fetch('http://localhost:4000/roles')
			.then(response => response.json())
			.then(response => this.setState({roles: response.data}))
			.catch(err => console.error(err));
	}
	
	renderRoles = ({role_name}) => <div key={role_name}>{role_name}</div>
	
	addRole = _ => {
		const { role } = this.state;
		fetch(`http://localhost:4000/roles/add?rolename=${role.role_name}`)
			.then(this.getRoles)
			.catch(err => console.error(err));
	}
	
	deleteRole = _ => {
		const { role } = this.state;
		fetch(`http://localhost:4000/roles/delete?rolename=${role.role_name}`)
			.then(this.getRoles)
			.catch(err => console.error(err));
	}
	*/
  render() {
//const { roles , role } = this.state;
	
    return (
      <div className="App">
		<Router>
		<div>
			<CustomNavbar />
			<Route exact path="/" component={Home} />
			<Route path="/customers" component={Customers} />
			<Route path="/employees/driver" component={EmployeesDriver} />
			<Route path="/employees/general" component={EmployeesGeneral} />
		</div>
		</Router>

      </div>
    );
  }
}
		/*
		{roles.map(this.renderRoles)}
		<div>
			<input 
			value={role.role_name} 
			onChange={e => this.setState({role: {...role, role_name: e.target.value}})}/>
			<button onClick={this.addRole}>Add New Role</button>
		</div>
		
		
		<Footer />
		*/

export default App;
