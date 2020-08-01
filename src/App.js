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
import { MdTurnedIn } from 'react-icons/md';

class App extends Component {
	constructor() {
		super();
		this.state = {
			allCrimeByTypeFromSingleDate: new Date(),
			allCrimeByTypeFromSingleDateData: undefined,
			allCrimeByDate: undefined,
			barGraphLocked: false,
			singleRowLock: false,
			lineGraphLock: false,
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
		this.setState({ singleRowLock: true, barGraphLocked: true });
		let self = this;
		AllCrimeByTypeFromSingleDate(
			date,
			function (results) {
				self.setState({
					allCrimeByTypeFromSingleDateData: results,
					singleRowLock: false,
					barGraphLocked: false,
				});
			},
			this.callOnErrorDefault
		);
	};

	getCrimeDataBySingleYear = (year) => {
		if (year !== undefined) {
			this.setState({ lineGraphLock: true });
			let self = this;
			SingleYear(
				year,
				function (results) {
					self.setState({
						allCrimeBySingleYearByDay: results,
						lineGraphLock: false,
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
		this.setState({ lineGraphLock: true });
		AllCrimeByDate(function (results) {
			self.setState({ allCrimeByDate: results, lineGraphLock: false });
		}, this.callOnErrorDefault);
	}

	getAllCrimeByMonth() {
		let self = this;
		this.setState({ lineGraphLock: true });
		AllCrimeByMonth(function (results) {
			self.setState({ allCrimeByMonth: results, lineGraphLock: true });
		}, this.callOnErrorDefault);
	}

	setSelectedSingleYear = (year) => {
		this.setState({ selectedSingleYear: year });
		this.getCrimeDataBySingleYear(year);
	};

	setSelectedSingleYearColor = (color) => {
		this.setState({ singleYearColor: color });
	};

	setMonthYear = (point) => {
		console.log(point);
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
										barGraphLocked={this.state.barGraphLocked}
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
										setMonthYear={this.setMonthYear}
										lineGraphLock={this.state.lineGraphLock}
										singleRowLock={this.state.singleRowLock}
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
