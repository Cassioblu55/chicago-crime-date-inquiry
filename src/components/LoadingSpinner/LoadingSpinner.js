import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Spinner } from 'react-bootstrap';

class LoadingSpinner extends Component {
	render() {
    let topMargin = this.props.height/2;
		return (
			<Container style={{ height: `${this.props.height}px` }}>
				<Row style={{ marginTop: `${topMargin}px` }}>
					<Col sm={12} style={{paddingLeft: "48%"}}>
						<Spinner animation='border' role='status'>
							<span className='sr-only'>Loading...</span>
						</Spinner>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LoadingSpinner;
