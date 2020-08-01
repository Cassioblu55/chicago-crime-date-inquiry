import React, { Component } from 'react';
import './App.css';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

//COMPONENTS
import Header from './components/Header/Header';
import Home from './components/Home';

//QUERY HELPERS
import { AllCrimeByTypeFromSingleDate } from './queries/AllCrimeByTypeFromSingleDate/AllCrimeByTypeFromSingleDate';
import { AllCrimeByDate } from './queries/AllCrimeByDate/AllCrimeByDate';
import { AllCrimeByMonth } from './queries/AllCrimeByMonth/AllCrimeByMonth';
import { SingleYear } from './queries/SingleYear/SingleYear';

class App extends Component {
	constructor() {
		super();
		this.state = {
			allCrimeByTypeFromSingleDate: new Date(),
			allCrimeByTypeFromSingleDateData: undefined,
			allCrimeByDate: undefined,
			dateChangerLocked: false,
			allCrimeByMonth: undefined,
			selectedSingleYear: undefined,
			allCrimeBySingleYearByDay: undefined,
			singleYearColor: undefined,
		};
	}

	componentDidMount() {
		this.getAllCrimeByTypeFromSingleDate(
			this.state.allCrimeByTypeFromSingleDate
		);
		this.getAllCrimeByDate();
		this.getAllCrimeByMonth();
	}

	callOnErrorDefault = (error) => {
		console.log(error);
	};

	getAllCrimeByTypeFromSingleDate = (date) => {
		this.setState({ dateChangerLocked: true });
		let self = this;
		AllCrimeByTypeFromSingleDate(
			date,
			function (results) {
				self.setState({
					allCrimeByTypeFromSingleDateData: results,
					dateChangerLocked: false,
				});
			},
			this.callOnErrorDefault
		);
	};

	getCrimeDataBySingleYear = (year) => {
		if (year !== undefined) {
			this.setState({ dateChangerLocked: true });
			let self = this;
			SingleYear(
				year,
				function (results) {
					self.setState({
						allCrimeBySingleYearByDay: results,
						dateChangerLocked: false,
					});
				},
				this.callOnErrorDefault
			);
		}
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

	getAllCrimeByMonth() {
		let self = this;
		AllCrimeByMonth(function (results) {
			self.setState({ allCrimeByMonth: results });
		}, this.callOnErrorDefault);
	}

	setSelectedSingleYear = (year) => {
		this.setState({ selectedSingleYear: year });
		this.getCrimeDataBySingleYear(year);
	};

	setSelectedSingleYearColor = (color) => {
		console.log(color);
		this.setState({ singleYearColor: color });
	};

	render() {
		return (
			<Container
				className={
					this.state.dateChangerLocked
						? 'anyGraphsLoading mainAppContainer'
						: 'mainAppContainer'
				}>
				<HashRouter basename='/'>
					<Header />
					<main>
						<Switch>
							<Route
								exact
								path='/home'
								render={() => (
									<Home
										dateChangerLocked={this.state.dateChangerLocked}
										mainGraphData={this.state.allCrimeByTypeFromSingleDateData}
										allCrimeByTypeFromSingleDate={
											this.state.allCrimeByTypeFromSingleDate
										}
										setAllCrimeByTypeFromSingleDate={
											this.setAllCrimeByTypeFromSingleDate
										}
										allCrimeByDate={this.state.allCrimeByDate}
										allCrimeByMonth={this.state.allCrimeByMonth}
										selectedSingleYear={this.state.selectedSingleYear}
										allCrimeBySingleYearByDay={
											this.state.allCrimeBySingleYearByDay
										}
										setSelectedSingleYear={this.setSelectedSingleYear}
										setSelectedSingleYearColor={this.setSelectedSingleYearColor}
										singleYearColor={this.state.singleYearColor}
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
