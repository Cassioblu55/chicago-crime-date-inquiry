import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button } from 'react-bootstrap';
import { MdPlayArrow } from 'react-icons/md';
import { IconContext } from 'react-icons';
import Moment from 'moment';
import ZoomLevel from '../../helpers/ZoomLevel';

class LineGraphDateSelector extends Component {
	zoomOut = () => {
		if (
			this.props.hour !== undefined &&
			this.props.zoomLevel === ZoomLevel.HOUR
		) {
			this.setSelectedSingleHour(undefined);
		} else if (
			this.props.day !== undefined &&
			this.props.zoomLevel === ZoomLevel.DAY
		) {
			this.setSelectedSingleDay(undefined);
		} else if (
			this.props.month !== undefined &&
			this.props.zoomLevel === ZoomLevel.MONTH
		) {
			this.setSelectedSingleMonth(undefined);
		} else if (
			this.props.year !== undefined &&
			this.props.zoomLevel === ZoomLevel.YEAR
		) {
			this.setSelectedSingleYear(undefined);
		}
	};

	zoomIn = () => {
		if (
			this.props.perviousSelectedHour !== undefined &&
			this.props.zoomLevel === ZoomLevel.DAY
		) {
			this.setSelectedSingleHour(this.props.perviousSelectedHour);
		} else if (
			this.props.perviousSelectedDay !== undefined &&
			this.props.zoomLevel === ZoomLevel.MONTH
		) {
			this.setSelectedSingleDay(this.props.perviousSelectedDay);
		} else if (
			this.props.perviousSelectedMonth !== undefined &&
			this.props.zoomLevel === ZoomLevel.YEAR
		) {
			this.setSelectedSingleMonth(this.props.perviousSelectedMonth);
		} else if (
			this.props.perviousSelectedYear !== undefined &&
			this.props.zoomLevel === ZoomLevel.ALL
		) {
			this.setSelectedSingleYear(this.props.perviousSelectedYear);
		}
	};

	setSelectedSingleYear = (year) => {
		this.props.setSelectedSingleYear(year);
	};

	setSelectedSingleMonth = (month) => {
		this.props.setSelectedSingleMonth(month);
	};

	setSelectedSingleDay = (day) => {
		this.props.setSelectedSingleDay(day);
	};

	setSelectedSingleHour = (hour) => {
		this.props.setSelectedSingleHour(hour);
	};

	getZoomOutLock = () => {
		return (
			this.props.locked ||
			this.props.zoomLevel === ZoomLevel.ALL ||
			(this.props.day === undefined &&
				this.props.month === undefined &&
				this.props.year === undefined &&
				this.props.hour === undefined)
		);
	};

	getZoomInLock = () => {
		return (
			this.props.locked ||
			this.props.zoomLevel === ZoomLevel.HOUR ||
			(this.props.perviousSelectedHour === undefined &&
				this.props.zoomLevel === ZoomLevel.DAY) ||
			(this.props.perviousSelectedDay === undefined &&
				this.props.zoomLevel === ZoomLevel.MONTH) ||
			(this.props.perviousSelectedMonth === undefined &&
				this.props.zoomLevel === ZoomLevel.YEAR) ||
			(this.props.perviousSelectedYear === undefined &&
				this.props.zoomLevel === ZoomLevel.ALL) ||
			(this.props.perviousSelectedDay === undefined &&
				this.props.perviousSelectedYear === undefined &&
				this.props.perviousSelectedMonth === undefined &&
				this.props.perviousSelectedHour === undefined)
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
