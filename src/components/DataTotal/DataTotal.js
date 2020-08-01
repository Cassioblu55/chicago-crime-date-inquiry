import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Numeral from 'numeral';

class DataTotal extends Component {
	render() {
		return (
			<Container>
				<Row className={'crimeTotal'}>
					{this.props.header}: {Numeral(this.props.total).format('0,0')}
				</Row>
			</Container>
		);
	}
}

export default DataTotal;
