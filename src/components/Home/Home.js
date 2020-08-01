import React, { Component } from 'react';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

//COMPONENTS
import GraphDisplay from '../GraphDisplay';
import DataDisplay from '../DataDisplay';
import DateChanger from '../DateChanger';
import DateFormat from 'date-format';
import Numeral from 'numeral';
import Moment from 'moment';

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
			return '';
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
					locked={this.props.dateChangerLocked}
				/>
				<Row>
					<GraphDisplay
						header={`All Crimes Reported on ${dateDisplay}`}
						data={this.props.mainGraphData}
						axisBottomLegend='Crime Type'
						axisLeftLegend='Crime Count'
						locked={this.props.dateChangerLocked}
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
							locked={this.props.dateChangerLocked}
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
							locked={this.props.dateChangerLocked}
							rowSelectedData={{
								left: Moment(
									this.props.allCrimeByTypeFromSingleDate,
									'MM-DD'
								).format('MMMM Do'),
							}}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;
