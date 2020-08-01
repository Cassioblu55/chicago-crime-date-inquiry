import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button } from 'react-bootstrap';
import { MdPlayArrow } from 'react-icons/md';
import { IconContext } from 'react-icons';
import Moment from 'moment';

class LineGraphDateSelector extends Component {
	constructor() {
		super();
		this.state = {
			perviousSelectedYear: undefined,
			perviousSelectedMonth: undefined,
			perviousSelectedDay: undefined,
		};
	}

	zoomOut = () => {
		if (this.props.day !== undefined) {
			this.setState({ perviousSelectedDay: this.props.day });
			this.setSelectedSingleDay(undefined);
		} else if (this.props.month !== undefined) {
			this.setState({ perviousSelectedMonth: this.props.month });
			this.setSelectedSingeMonth(undefined);
		} else if (this.props.year !== undefined) {
			this.setState({ perviousSelectedYear: this.props.year });
			this.setSelectedSingleYear(undefined);
		}
	};

	zoomIn = () => {
		if (this.state.perviousSelectedDay !== undefined) {
			this.setSelectedSingleDay(this.state.perviousSelectedDay);
			this.setState({ perviousSelectedDay: undefined });
		} else if (this.state.perviousSelectedMonth !== undefined) {
			this.setSelectedSingeMonth(this.state.perviousSelectedMonth);
			this.setState({ perviousSelectedMonth: undefined });
		} else if (this.state.perviousSelectedYear !== undefined) {
			this.setSelectedSingleYear(this.state.perviousSelectedYear);
			this.setState({ perviousSelectedYear: undefined });
		}
	};

	setSelectedSingleYear = (year) => {
		this.props.setSelectedSingleYear(year);
	};

	setSelectedSingeMonth = (month) => {
		this.props.setSelectedSingeMonth(month);
	};

	setSelectedSingleDay = (day) => {
		this.props.setSelectedSingleDay(day);
	};

	getZoomOutLock = () => {
		return (
			this.props.locked ||
			(this.props.day &&
				this.props.month === undefined &&
				this.props.year === undefined)
		);
	};

	getZoomInLock = () => {
		return (
			this.props.locked ||
			(this.state.perviousSelectedDay === undefined &&
				this.state.perviousSelectedYear === undefined &&
				this.state.perviousSelectedMonth === undefined)
		);
	};

	getLineGraphHeader = (year, month, day) => {
		if (year !== undefined && month !== undefined && day !== undefined) {
			return `Crimes ${Moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format(
				'MMM Do YYYY'
			)}`;
		} else if (year !== undefined && month !== undefined) {
			return `Crimes ${Moment(`${year}-${month}`, 'YYYY-MM').format(
				'MMMM YYYY'
			)}`;
		} else if (year !== undefined) {
			return `Crimes ${year}`;
		} else {
			return 'All Crimes';
		}
	};

	render() {
		return (
			<Container style={{ marginTop: '15px' }}>
				<Row>
					<Col>
						<Button
							variant='dark'
							onClick={this.zoomOut}
							disabled={this.getZoomOutLock()}>
							<IconContext.Provider
								value={{
									style: { transform: 'scaleX(-1)' },
								}}>
								<MdPlayArrow />
							</IconContext.Provider>
						</Button>
					</Col>
					<Col xs={10}>
						<h3 className='text-center'>
							{this.getLineGraphHeader(
								this.props.year,
								this.props.month,
								this.props.day
							)}
						</h3>
					</Col>
					<Col>
						<Button
							className='float-right'
							variant='dark'
							onClick={this.zoomIn}
							disabled={this.getZoomInLock()}>
							<MdPlayArrow />
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LineGraphDateSelector;
