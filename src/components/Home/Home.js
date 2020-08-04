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
import ZoomLevel from '../../helpers/ZoomLevel';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CompleteDataDisplay from '../CompleteDataDisplay/CompleteDataDisplay';

import DataTotal from '../DataTotal';

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

	getSingleZoomGraphDisplay = (zoomLevel) => {
		if (
			this.props.selectedSingleHour !== undefined &&
			this.props.zoomLevel === ZoomLevel.HOUR
		) {
			return zoomLevel === ZoomLevel.HOUR;
		} else if (
			this.props.selectedSingleDay !== undefined &&
			this.props.zoomLevel === ZoomLevel.DAY
		) {
			return zoomLevel === ZoomLevel.DAY;
		} else if (
			this.props.selectedSingleMonth !== undefined &&
			this.props.zoomLevel === ZoomLevel.MONTH
		) {
			return zoomLevel === ZoomLevel.MONTH;
		} else if (
			this.props.selectedSingleYear !== undefined &&
			this.props.zoomLevel === ZoomLevel.YEAR
		) {
			return zoomLevel === ZoomLevel.YEAR;
		} else if (this.props.zoomLevel === ZoomLevel.ALL) {
			return zoomLevel === ZoomLevel.ALL;
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

	getMainBarGraphTotal = (data) => {
		if (data !== undefined) {
			let total = 0;
			for (let key of Object.keys(data)) {
				total += data[key];
			}
			return total;
		} else {
			return 0;
		}
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
					<Col>
						<h3 className='text-center'>
							All Crimes Reported on {dateDisplay}
						</h3>
					</Col>
					<BarGraphDisplay
						data={this.props.mainGraphData}
						axisBottomLegend='Crime Type'
						axisLeftLegend='Crime Count'
						graphHeight={400}
						locked={this.props.barGraphLocked}
					/>
					{this.props.mainGraphData && (
						<DataTotal
							header={`Total Crime Reported on ${dateDisplay}`}
							total={this.getMainBarGraphTotal(this.props.mainGraphData)}
						/>
					)}
				</Row>
				<Row>
					<Col sm={12} md={6}>
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
					<Col sm={12} md={6}>
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
						setSelectedSingleMonth={this.props.setSelectedSingleMonth}
						setSelectedSingleDay={this.props.setSelectedSingleDay}
						setSelectedSingleHour={this.props.setSelectedSingleHour}
						perviousSelectedHour={this.props.perviousSelectedHour}
						zoomLevel={this.props.zoomLevel}
						hour={this.props.selectedSingleHour}
						day={this.props.selectedSingleDay}
						year={this.props.selectedSingleYear}
						month={this.props.selectedSingleMonth}
						perviousSelectedDay={this.props.perviousSelectedDay}
						perviousSelectedYear={this.props.perviousSelectedYear}
						perviousSelectedMonth={this.props.perviousSelectedMonth}
						locked={this.props.lineGraphLock}
					/>
				</Row>
				<Row>
					{this.getSingleZoomGraphDisplay(ZoomLevel.HOUR) &&
						this.props.allCrimeBySingleHour === undefined && (
							<LoadingSpinner height={450} />
						)}

					{this.getSingleZoomGraphDisplay(ZoomLevel.HOUR) &&
						this.props.allCrimeBySingleHour !== undefined && (
							<Container>
								<BarGraphDisplay
									data={this.props.allCrimeBySingleHour}
									axisLeftLegend='Crime Count'
									axisBottomLegend='Type'
									locked={this.props.lineGraphLock}
									graphHeight={450}
								/>
								{this.props.allCrimeBySingleHour && (
									<DataTotal
										header={`Crime from ${Moment(
											`${this.props.selectedSingleHour}:00:00`,
											'HH:mm:ss'
										).format('LT')} - ${Moment(
											`${this.props.selectedSingleHour}:59:59`,
											'HH:mm:ss'
										).format('LT')}`}
										total={this.getMainBarGraphTotal(
											this.props.allCrimeBySingleHour
										)}
									/>
								)}
							</Container>
						)}
					{this.getSingleZoomGraphDisplay(ZoomLevel.DAY) && (
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
							setSelectedSingleHour={this.props.setSelectedSingleHour}
						/>
					)}
					{this.getSingleZoomGraphDisplay(ZoomLevel.MONTH) && (
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
					{this.getSingleZoomGraphDisplay(ZoomLevel.YEAR) && (
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
					{this.getSingleZoomGraphDisplay(ZoomLevel.ALL) && (
						<LineGraphDisplayAllYears
							data={this.props.allCrimeByMonth}
							axisLeftLegend='Crime Count'
							axisBottomLegend='Month'
							locked={this.props.lineGraphLock}
							setSelectedSingleYear={this.props.setSelectedSingleYearFromLegend}
							setLineGraphColor={this.props.setLineGraphColor}
							graphHeight={450}
						/>
					)}
				</Row>
				<Row>
					{this.props.singleHourCompleteData &&
						this.props.zoomLevel === ZoomLevel.HOUR && (
							<CompleteDataDisplay
								data={this.props.singleHourCompleteData}
								hour={this.props.selectedSingleHour}
								day={this.props.selectedSingleDay}
								year={this.props.selectedSingleYear}
								month={this.props.selectedSingleMonth}
							/>
						)}
				</Row>
			</Container>
		);
	}
}

export default Home;
