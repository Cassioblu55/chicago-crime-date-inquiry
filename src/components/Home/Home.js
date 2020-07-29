import React, { Component } from 'react';

//BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

//COMPONENTS
import GraphDisplay from '../GraphDisplay';
import DataDisplay from '../DataDisplay';
import DateChanger from '../DateChanger';

class Home extends Component {
	render() {
		return (
			<Container>
				<DateChanger />
				<GraphDisplay />
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
