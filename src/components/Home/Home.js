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

	render() {
		const dateDisplay = DateFormat.asString(
			'MM-dd',
			this.props.allCrimeByTypeFromSingleDate
		);
		return (
			<Container>
				<DateChanger
					date={this.props.allCrimeByTypeFromSingleDate}
					setDate={this.props.setAllCrimeByTypeFromSingleDate}
				/>
				<Row>
					<GraphDisplay
						header={`All Crimes Reported on ${dateDisplay}`}
						data={this.props.mainGraphData}
						axisBottomLegend='Crime Type'
						axisLeftLegend='Crime Count'
					/>
				</Row>
				<Row>
					<Col>
						<DataDisplay
							data={this.getTopTenCrimeDays(this.props.allCrimeByDate)}
							header='Days with Most Crime'
						/>
					</Col>
					<Col>
						<DataDisplay
							data={this.getBottomTenCrimeDays(this.props.allCrimeByDate)}
							header='Days with Least Crime'
							leftSideKey='date'
							rightSideKey='count'
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;
