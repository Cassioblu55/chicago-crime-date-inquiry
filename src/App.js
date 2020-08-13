import React, { Component } from 'react';
import './App.css';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

//COMPONENTS
import Header from './components/Header/Header';
import Home from './components/Home';

// Hou comment: nice job with keeping the queries in their own folders for
// better separation of concerns!
//QUERY HELPERS
import { AllCrimeByTypeFromSingleDate } from './queries/AllCrimeByTypeFromSingleDate/AllCrimeByTypeFromSingleDate';
import { AllCrimeByDate } from './queries/AllCrimeByDate/AllCrimeByDate';
import { AllCrimeByMonth } from './queries/AllCrimeByMonth/AllCrimeByMonth';
import { SingleYear } from './queries/SingleYear/SingleYear';
import { SingleMonth } from './queries/SingleMonth/SingleMonth';
import { SingleDay } from './queries/SingleDay/SingleDay';
import { SingleHour } from './queries/SingleHour/SingleHour';
import { CompleteDataSingleHour } from './queries/CompleteDataSingleHour/CompleteDataSingleHour';

import ZoomLevel from './helpers/ZoomLevel';

class App extends Component {
	constructor() {
		super();
		this.state = {
			//Main Graph Data
			allCrimeByTypeFromSingleDate: new Date(),
			allCrimeByTypeFromSingleDateData: undefined,
			allCrimeByDate: undefined,

			//Loading Locks
			barGraphLocked: false,
			singleRowLock: false,
			lineGraphLock: false,
			completeDataLock: false,

			lineGraphColor: undefined,
			zoomLevel: ZoomLevel.ALL,

			//Single Year
			allCrimeBySingleYear: undefined,
			selectedSingleYear: undefined,
			perviousSelectedYear: undefined,

			//Single Month
			perviousSelectedMonth: undefined,
			selectedSingleMonth: undefined,
			allCrimeBySingleMonth: undefined,

			//Single Day
			perviousSelectedDay: undefined,
			selectedSingleDay: undefined,
			allCrimeBySingleDay: undefined,

			//Single Hour
			allCrimeBySingleHour: undefined,
			selectedSingleHour: undefined,
			perviousSelectedHour: undefined,
			singleHourCompleteData: undefined,
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
		// Hou comment: for a better user experience, perhaps display an error message to the user
		console.log(error);
	};

	//Get All Crimes for every year
	getAllCrimeByMonth = () => {
		// Hou comment: we don't conventionally store `this` in a variable
		// You can use an arrow function instead to define getAllCrimeByMonth to avoid losing the this context in your callback function on line 85 
		// I'd encourage you to refactor all of your class methods to use the arrow function syntax, to preserve the `this` context automatically inside callback functions
		this.setState({ lineGraphLock: true });
		AllCrimeByMonth((results) => {
			this.setState({ allCrimeByMonth: results, lineGraphLock: true });
		}, this.callOnErrorDefault);
	}

	//Get Date Display Data
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

	getAllCrimeByDate() {
		let self = this;
		this.setState({ lineGraphLock: true });
		AllCrimeByDate(function (results) {
			self.setState({ allCrimeByDate: results, lineGraphLock: false });
		}, this.callOnErrorDefault);
	}

	setAllCrimeByTypeFromSingleDate = (date) => {
		this.setState({
			allCrimeByTypeFromSingleDate: date,
		});
		this.getAllCrimeByTypeFromSingleDate(date);
	};

	//Single Year
	setSelectedSingleYear = (year) => {
		this.setState({
			perviousSelectedYear:
				this.state.selectedSingleYear || this.state.perviousSelectedYear,
			selectedSingleYear: year,
			zoomLevel: year === undefined ? ZoomLevel.ALL : ZoomLevel.YEAR,
		});
		this.getCrimeDataBySingleYear(year);
	};

	getCrimeDataBySingleYear = (year) => {
		if (year) {
			this.setState({ lineGraphLock: true });
			let self = this;
			SingleYear(
				year,
				function (results) {
					self.setState({
						allCrimeBySingleYear: results,
						lineGraphLock: false,
					});
				},
				this.callOnErrorDefault
			);
		}
	};

	setSelectedSingleYearFromLegend = (year) => {
		this.setState({
			perviousSelectedYear: undefined,
			perviousSelectedMonth: undefined,
			perviousSelectedDay: undefined,
			perviousSelectedHour: undefined,
			selectedSingleYear: year,
			zoomLevel: !year ? ZoomLevel.ALL : ZoomLevel.YEAR,
		});
		this.getCrimeDataBySingleYear(year);
	};

	//Single Month
	setSelectedSingleMonth = (month) => {
		if (this.state.selectedSingleYear) {
			this.setState({
				perviousSelectedMonth:
					this.state.selectedSingleMonth || this.state.perviousSelectedMonth,
				selectedSingleMonth: month,
				zoomLevel: !month ? ZoomLevel.YEAR : ZoomLevel.MONTH,
			});
			this.getCrimeDataBySingleMonth(this.state.selectedSingleYear, month);
		}
	};

	getCrimeDataBySingleMonth = (year, month) => {
		if (year && month) {
			this.setState({ lineGraphLock: true });
			let self = this;
			SingleMonth(
				year,
				month,
				function (results) {
					self.setState({
						allCrimeBySingleMonth: results,
						lineGraphLock: false,
					});
				},
				this.callOnErrorDefault
			);
		}
	};

	//Single Day
	setSelectedSingleDay = (day) => {
		// Hou comment: let's destructure this.state to simplify the syntax
		const {
			selectedSingleYear,
			selectedSingleMonth,
			perviousSelectedDay,
		}
		if (
			selectedSingleYear &&
			selectedSingleMonth
		) {
			this.setState({
				perviousSelectedDay: selectedSingleDay || perviousSelectedDay,
				selectedSingleDay: day,
				zoomLevel: !day ? ZoomLevel.MONTH : ZoomLevel.DAY,
			});
			this.getCrimeDataBySingleDay(
				selectedSingleYear,
				selectedSingleMonth,
				day
			);
		}
	};

	getCrimeDataBySingleDay = (year, month, day) => {
		if (year && month && day) {
			this.setState({ lineGraphLock: true });
			let self = this;
			SingleDay(
				year,
				month,
				day,
				function (results) {
					self.setState({
						allCrimeBySingleDay: results,
						lineGraphLock: false,
					});
				},
				this.callOnErrorDefault
			);
		}
	};

	//Single Hour
	setSelectedSingleHour = (hour) => {
		// Hou comment: destructure this.state like what we did with setSelectedSingleDay above to avoid accessing the same properties on this.state repeatedly
		if (
			this.state.selectedSingleYear &&
			this.state.selectedSingleMonth &&
			this.state.selectedSingleDay
		) {
			this.setState({
				perviousSelectedHour:
					this.state.selectedSingleHour || this.state.perviousSelectedHour,
				selectedSingleHour: hour,
				zoomLevel: hour === undefined ? ZoomLevel.DAY : ZoomLevel.HOUR,
			});
			this.getCrimeDataBySingleHour(
				this.state.selectedSingleYear,
				this.state.selectedSingleMonth,
				this.state.selectedSingleDay,
				hour
			);
			this.getCompleteDataSingleHour(
				this.state.selectedSingleYear,
				this.state.selectedSingleMonth,
				this.state.selectedSingleDay,
				hour
			);
		}
	};

	getCrimeDataBySingleHour = (year, month, day, hour) => {
		if (
			year &&
			month &&
			day &&
			hour
		) {
			this.setState({ lineGraphLock: true });
			let self = this;
			SingleHour(
				year,
				month,
				day,
				hour,
				function (results) {
					self.setState({
						allCrimeBySingleHour: results,
						lineGraphLock: false,
					});
				},
				this.callOnErrorDefault
			);
		}
	};

	getCompleteDataSingleHour = (year, month, day, hour) => {
		if (
			year &&
			month &&
			day &&
			hour
		) {
			this.setState({ completeDataLock: true });
			let self = this;
			CompleteDataSingleHour(
				year,
				month,
				day,
				hour,
				function (results) {
					self.setState({
						singleHourCompleteData: results,
						completeDataLock: false,
					});
				},
				this.callOnErrorDefault
			);
		}
	};

	render() {
		// Hou comment: destructure this.state like what we did with setSelectedSingleDay above to avoid accessing the same properties on this.state repeatedly
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
										//LoadingLocks
										barGraphLocked={this.state.barGraphLocked}
										singleRowLock={this.state.singleRowLock}
										lineGraphLock={this.state.lineGraphLock}
										completeDataLock={this.state.completeDataLock}
										//All Crime By Month
										allCrimeByMonth={this.state.allCrimeByMonth}
										//Single Year
										allCrimeBySingleYear={this.state.allCrimeBySingleYear}
										setSelectedSingleYear={this.setSelectedSingleYear}
										selectedSingleYear={this.state.selectedSingleYear}
										perviousSelectedYear={this.state.perviousSelectedYear}
										setSelectedSingleYearFromLegend={
											this.setSelectedSingleYearFromLegend
										}
										//Single Month
										setSelectedSingleMonth={this.setSelectedSingleMonth}
										selectedSingleMonth={this.state.selectedSingleMonth}
										allCrimeBySingleMonth={this.state.allCrimeBySingleMonth}
										setSelectedSingeMonth={this.setSelectedSingeMonth}
										perviousSelectedMonth={this.state.perviousSelectedMonth}
										//Single Day
										allCrimeByTypeFromSingleDate={
											this.state.allCrimeByTypeFromSingleDate
										}
										perviousSelectedDay={this.state.perviousSelectedDay}
										selectedSingleDay={this.state.selectedSingleDay}
										allCrimeBySingleDay={this.state.allCrimeBySingleDay}
										setSelectedSingleDay={this.setSelectedSingleDay}
										//Single Hour
										perviousSelectedHour={this.state.perviousSelectedHour}
										selectedSingleHour={this.state.selectedSingleHour}
										allCrimeBySingleHour={this.state.allCrimeBySingleHour}
										setSelectedSingleHour={this.setSelectedSingleHour}
										singleHourCompleteData={this.state.singleHourCompleteData}
										//Main Bar Graph
										mainGraphData={this.state.allCrimeByTypeFromSingleDateData}
										//Data Display Rows
										allCrimeByDate={this.state.allCrimeByDate}
										setAllCrimeByTypeFromSingleDate={
											this.setAllCrimeByTypeFromSingleDate
										}
										//Line Graph
										setLineGraphColor={this.setLineGraphColor}
										lineGraphColor={this.state.lineGraphColor}
										zoomLevel={this.state.zoomLevel}
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

	// Hou comment: move this method above the render() method for easier discoverability
	setLineGraphColor = (color) => {
		this.setState({ lineGraphColor: color });
	};
}

export default App;
