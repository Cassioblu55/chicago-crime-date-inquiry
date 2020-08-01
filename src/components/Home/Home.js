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
import LineGraphDisplaySingleYearMonth from '../LineGraphDisplaySingleYearMonth';
import LineGraphDisplaySingleYearMonthDay from '../LineGraphDisplaySingleYearMonthDay/LineGraphDisplaySingleYearMonthDay';

//CSS
import './Home.css';

const LINE_GRAPH_DISPLAY_TYPE = {
	ALL: 'all',
	YEAR: 'year',
	MONTH: 'month',
	DAY: 'day',
};

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

	getLineGraphDisplay = (type) => {
		if (this.props.selectedSingleDay !== undefined) {
			return type === LINE_GRAPH_DISPLAY_TYPE.DAY;
		} else if (this.props.selectedSingleMonth !== undefined) {
			return type === LINE_GRAPH_DISPLAY_TYPE.MONTH;
		} else if (this.props.selectedSingleYear !== undefined) {
			return type === LINE_GRAPH_DISPLAY_TYPE.YEAR;
		} else{
			return type === LINE_GRAPH_DISPLAY_TYPE.ALL;
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
						displayDate={dateDisplay}
						data={this.props.mainGraphData}
						axisBottomLegend='Crime Type'
						axisLeftLegend='Crime Count'
						graphHeight={400}
						locked={this.props.barGraphLocked}
					/>
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
						setSelectedSingleYear={this.props.setSelectedSingleYear}
						setSelectedSingeMonth={this.props.setSelectedSingeMonth}
						setSelectedSingleDay={this.props.setSelectedSingleDay}
						day={this.props.selectedSingleDay}
						year={this.props.selectedSingleYear}
						month={this.props.selectedSingleMonth}
						locked={this.props.lineGraphLock}
					/>
				</Row>
				<Row>
					{this.getLineGraphDisplay(LINE_GRAPH_DISPLAY_TYPE.DAY) && (
						<LineGraphDisplaySingleYearMonthDay
							data={this.props.allCrimeBySingleDay}
							year={this.props.selectedSingleYear}
							month={this.props.selectedSingleMonth}
							axisLeftLegend='Crime Count'
							axisBottomLegend='Time'
							day={this.props.selectedSingleDay}
							color={this.props.lineGraphColor}
							locked={this.props.lineGraphLock}
							graphHeight={450}
						/>
					)}
					{this.getLineGraphDisplay(LINE_GRAPH_DISPLAY_TYPE.MONTH) && (
						<LineGraphDisplaySingleYearMonth
							data={this.props.allCrimeBySingleMonth}
							year={this.props.selectedSingleYear}
							month={this.props.selectedSingleMonth}
							axisLeftLegend='Crime Count'
							axisBottomLegend='Day'
							color={this.props.lineGraphColor}
							locked={this.props.lineGraphLock}
							graphHeight={450}
							setSelectedSingleDay={this.props.setSelectedSingleDay}
						/>
					)}
					{this.getLineGraphDisplay(LINE_GRAPH_DISPLAY_TYPE.YEAR) && (
						<LineGraphDisplaySingleYear
							data={this.props.allCrimeBySingleYear}
							year={this.props.selectedSingleYear}
							color={this.props.lineGraphColor}
							axisLeftLegend='Crime Count'
							axisBottomLegend='Month'
							locked={this.props.lineGraphLock}
							graphHeight={450}
							setSelectedSingleMonth={this.props.setSelectedSingleMonth}
						/>
					)}
					{this.getLineGraphDisplay(LINE_GRAPH_DISPLAY_TYPE.ALL) && (
						<LineGraphDisplayAllYears
							data={this.props.allCrimeByMonth}
							axisLeftLegend='Crime Count'
							axisBottomLegend='Month'
							locked={this.props.lineGraphLock}
							setSelectedSingleYear={this.props.setSelectedSingleYear}
							setLineGraphColor={this.props.setLineGraphColor}
							graphHeight={450}
						/>
					)}
				</Row>
			</Container>
		);
	}
}

export default Home;
