import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
				<NavItem eventKey={1} componentClass={Link} href="/employees" to="/employees">
					Employees
				</NavItem>
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