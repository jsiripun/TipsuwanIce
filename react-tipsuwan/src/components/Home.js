import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
			this.state = {
			date: '1',
		}
	}
	
	componentDidMount() {
		this.getDate();
	}
	
	getDate = _ => {
		let d = new Date();
		console.log(d.toDateString());
		this.setState({date: d.toDateString()});
	}
	
	
	render() {
		
		return (
			<div className="container-fluid bg-1 text-center">
			  <h3 className="margin" id="demo">{this.state.date}</h3>
			</div>
		)
	}
}

export default Home;