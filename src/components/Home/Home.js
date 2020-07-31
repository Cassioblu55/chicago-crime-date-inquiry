import React, { Component } from 'react';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

//COMPONENTS
import GraphDisplay from '../GraphDisplay';
import DataDisplay from '../DataDisplay';
import DateChanger from '../DateChanger';
import DateFormat from 'date-format';

class Home extends Component {
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
						<DataDisplay />
					</Col>
					<Col>
						<DataDisplay />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;
