import React, { Component } from 'react';

//NPM COMPONENTS
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import DateFormat from 'date-format';
import Numeral from 'numeral';
import Moment from 'moment';

//CUSTOM COMPONENTS
import BarGraphDisplay from '../BarGraphDisplay/BarGraphDisplay';
import DataDisplay from '../DataDisplay';
import DateChanger from '../DateChanger';
import LineGraphDisplayAllYears from '../LineGraphDisplayAllYears/LineGraphDisplayAllYears';
import LineGraphDateSelector from '../LineGraphDateSelector/LineGraphDateSelector';
import LineGraphDisplaySingleYear from '../LineGraphDisplaySingleYear';

//CSS
import './Home.css';

class Home extends Component {
	getTopTenCrimeDays = (data) => {
		if (data !== undefined) {
			return data
				.sort((a, b) => (a.amount > b.amount ? -1 : 1))
				.slice(0, 10)
				.map((row) => {
					return {
						left: this.formatDate(row.date),
						right: this.formatAmount(row.amount),
					};
				});
		} else {
			return undefined;
		}
	};

	getBottomTenCrimeDays = (data) => {
		if (data !== undefined) {
			return data
				.sort((a, b) => (a.amount < b.amount ? -1 : 1))
				.slice(0, 10)
				.map((row) => {
					return {
						left: this.formatDate(row.date),
						right: this.formatAmount(row.amount),
					};
				});
		} else {
			return undefined;
		}
	};

	getLineGraphHeader = (year) => {
		if (year !== undefined) {
			return `Crimes Committed in ${year}`;
		} else {
			return 'All Crimes Commited';
		}
	};

	formatAmount(amount) {
		return Numeral(amount).format('0,0');
	}

	formatDate(date) {
		return Moment(date, 'MM-DD').format('MMMM Do');
	}

	getCrimeTotal(data) {
		if (data !== undefined) {
			let total = 0;
			for (let key of Object.keys(data)) {
				total += data[key];
			}
			return this.formatAmount(total);
		} else {
			return 'Crimes by Year';
		}
	}

	setDateByDataDisplay = (data) => {
		let requestedDate = new Date(Moment(data.left, 'MMMM Do'));
		this.props.setAllCrimeByTypeFromSingleDate(requestedDate);
	};

	render() {
		const dateDisplay =
			DateFormat.asString('MM-dd', this.props.allCrimeByTypeFromSingleDate) +
			` (2001-${new Date().getFullYear()})`;
		return (
			<Container>
				<DateChanger
					date={this.props.allCrimeByTypeFromSingleDate}
					setDate={this.props.setAllCrimeByTypeFromSingleDate}
					locked={this.props.barGraphLocked}
				/>
				<Row>
					<BarGraphDisplay
						header={`All Crimes Reported on ${dateDisplay}`}
						data={this.props.mainGraphData}
						axisBottomLegend='Crime Type'
						axisLeftLegend='Crime Count'
						graphHeight={400}
						locked={this.props.barGraphLocked}
					/>
				</Row>
				<Row className={'crimeTotal'}>
					Total Crime Reported: {this.getCrimeTotal(this.props.mainGraphData)}
				</Row>
				<Row>
					<Col>
						<DataDisplay
							data={this.getTopTenCrimeDays(this.props.allCrimeByDate)}
							header='Days with Most Crime'
							onClick={this.setDateByDataDisplay}
							onClickDataSend={['left']}
							locked={this.props.singleRowLock}
							loadingContainerHeight={330}
							rowSelectedData={{
								left: Moment(
									this.props.allCrimeByTypeFromSingleDate,
									'MM-DD'
								).format('MMMM Do'),
							}}
						/>
					</Col>
					<Col>
						<DataDisplay
							data={this.getBottomTenCrimeDays(this.props.allCrimeByDate)}
							header='Days with Least Crime'
							onClick={this.setDateByDataDisplay}
							onClickDataSend={['left']}
							locked={this.props.singleRowLock}
							loadingContainerHeight={330}
							rowSelectedData={{
								left: Moment(
									this.props.allCrimeByTypeFromSingleDate,
									'MM-DD'
								).format('MMMM Do'),
							}}
						/>
					</Col>
				</Row>
				<Row>
					<LineGraphDateSelector
						header={this.getLineGraphHeader(this.props.selectedSingleYear)}
						setSelectedSingleYear={this.props.setSelectedSingleYear}
						locked={this.props.lineGraphLock}
						selectedSingleYear={this.props.selectedSingleYear}
					/>
				</Row>
				<Row>
					{this.props.selectedSingleYear !== undefined && (
						<LineGraphDisplaySingleYear
							data={this.props.allCrimeBySingleYearByDay}
							year={this.props.selectedSingleYear}
							color={this.props.singleYearColor}
							locked={this.props.lineGraphLock}
							graphHeight={450}
							setMonthYear={this.props.setMonthYear}
						/>
					)}
					{this.props.selectedSingleYear === undefined && (
						<LineGraphDisplayAllYears
							data={this.props.allCrimeByMonth}
							axisLeftLegend='Crime Count'
							axisBottomLegend='Month'
							locked={this.props.lineGraphLock}
							setSelectedSingleYear={this.props.setSelectedSingleYear}
							setSelectedSingleYearColor={this.props.setSelectedSingleYearColor}
							graphHeight={450}
						/>
					)}
				</Row>
			</Container>
		);
	}
}

export default Home;
