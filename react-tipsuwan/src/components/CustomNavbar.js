import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

class CustomNavbar extends React.Component {
  render() {
    return (
	
	<Navbar default collapseOnSelect>
		<Navbar.Header>
			<Navbar.Brand>
				<Link to="/">Tipsuwan</Link>
			</Navbar.Brand>
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav pullRight>
				<NavDropdown eventKey={1} title="Employees">
				  <MenuItem eventKey={1.1} componentClass={Link} href="/employees/general" to="/employees/general">General Employees</MenuItem>
				  <MenuItem eventKey={1.2} componentClass={Link} href="/employees/driver" to="/employees/driver">Driver Employees</MenuItem>
				</NavDropdown>
				<NavItem eventKey={2} componentClass={Link} href="/customers" to="/customers">
					Customers
				</NavItem>
				
				
			</Nav>
		</Navbar.Collapse>
	</Navbar>
	
    )
  }
}

export default CustomNavbar;