import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import CompleteDataDisplayRow from './CompleteDataDisplayRow';

class CompleteDataDisplay extends Component {
	render() {
		let mergedRows = [];
		for (let i = 0; i < this.props.data.length; i += 2) {
			let right =
				this.props.data.length > i + 1 ? this.props.data[i + 1] : undefined;
			mergedRows.push({ left: this.props.data[i], right: right });
		}
		return (
			<Container>
				<Row>
					<Col>
						<h2 className='text-center'>Data Complete</h2>
					</Col>
				</Row>
				{mergedRows.map((row, index) => {
					return (
						<Row key={index}>
							<Col sm={12} md={6}>
								<CompleteDataDisplayRow data={row.left} />
							</Col>
							<Col sm={12} md={6}>
								<CompleteDataDisplayRow data={row.right} />
							</Col>
						</Row>
					);
				})}
			</Container>
		);
	}
}

export default CompleteDataDisplay;
