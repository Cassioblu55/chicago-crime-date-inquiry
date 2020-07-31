import React, { Component } from 'react';
import './App.css';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

//COMPONENTS
import Header from './components/Header/Header';
import Home from './components/Home';
import Search from './components/Search';

//QUERY HELPERS
import { AllCrimeByTypeFromSingleDate } from './queries/AllCrimeByTypeFromSingleDate/AllCrimeByTypeFromSingleDate';

import { AllCrimeByDate } from './queries/AllCrimeByDate/AllCrimeByDate';

class App extends Component {
	constructor() {
		super();
		this.state = {
			allCrimeByTypeFromSingleDate: new Date(),
			allCrimeByTypeFromSingleDateData: undefined,
			allCrimeByDate: undefined,
		};
	}

	componentDidMount() {
		this.getAllCrimeByTypeFromSingleDate(
			this.state.allCrimeByTypeFromSingleDate
		);
		this.getAllCrimeByDate();
	}

	callOnErrorDefault = (error) => {
		console.log(error);
	};

	getAllCrimeByTypeFromSingleDate = (date) => {
		let self = this;
		AllCrimeByTypeFromSingleDate(
			date,
			function (results) {
				self.setState({ allCrimeByTypeFromSingleDateData: results });
			},
			this.callOnErrorDefault
		);
	};

	setAllCrimeByTypeFromSingleDate = (date) => {
		this.setState({
			allCrimeByTypeFromSingleDate: date,
		});
		this.getAllCrimeByTypeFromSingleDate(date);
	};

	getAllCrimeByDate() {
		let self = this;
		AllCrimeByDate(function (results) {
			self.setState({ allCrimeByDate: results });
		}, this.callOnErrorDefault);
	}

	render() {
		return (
			<Container>
				<HashRouter basename='/'>
					<Header />
					<main>
						<Switch>
							<Route
								exact
								path='/home'
								render={() => (
									<Home
										mainGraphData={this.state.allCrimeByTypeFromSingleDateData}
										allCrimeByTypeFromSingleDate={
											this.state.allCrimeByTypeFromSingleDate
										}
										setAllCrimeByTypeFromSingleDate={
											this.setAllCrimeByTypeFromSingleDate
										}
										allCrimeByDate={this.state.allCrimeByDate}
									/>
								)}
							/>
							<Redirect path='*' to='/home' />
						</Switch>
					</main>
				</HashRouter>
			</Container>
		);
	}
}

export default App;
