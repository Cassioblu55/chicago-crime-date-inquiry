import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button } from 'react-bootstrap';
import { MdPlayArrow } from 'react-icons/md';
import { IconContext } from 'react-icons';

class LineGraphDateSelector extends Component {
	constructor() {
		super();
		this.state = {
			perviousSelectedSingleYear: undefined,
		};
	}

	zoomOut = () => {
		let selectedSingleYear = this.props.selectedSingleYear;
		this.setState({ perviousSelectedSingleYear: selectedSingleYear });
		this.setSelectedSingleYear(undefined);
	};

	zoomIn = () => {
		this.setSelectedSingleYear(this.state.perviousSelectedSingleYear);
	};

	setSelectedSingleYear = (year) => {
		this.props.setSelectedSingleYear(year);
	};

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<Button
							variant='dark'
							onClick={this.zoomOut}
							disabled={this.props.selectedSingleYear === undefined}>
							<IconContext.Provider
								value={{
									style: { transform: 'scaleX(-1)' },
								}}>
								<MdPlayArrow />
							</IconContext.Provider>
						</Button>
					</Col>
					<Col>
						<h3 className='text-center'>{this.props.header}</h3>
					</Col>
					<Col>
						<Button
							className='float-right'
							variant='dark'
							onClick={this.zoomIn}
							disabled={
								this.state.perviousSelectedSingleYear === undefined ||
								this.props.selectedSingleYear !== undefined
							}>
							<MdPlayArrow />
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LineGraphDateSelector;
