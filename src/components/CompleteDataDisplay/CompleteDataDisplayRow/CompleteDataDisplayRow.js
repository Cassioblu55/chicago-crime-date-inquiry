import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Moment from 'moment';
import Capitalize from 'capitalize';
import './CompleteDataDisplayRow.css';
import Numeral from 'numeral';


class CompleteDataDisplayRow extends Component {

	capitalizeFirstLetter(sentence) {
		return (
			sentence.charAt(0).toUpperCase() + sentence.substring(1).toLowerCase()
		);
	}

	render() {
		if (this.props.data !== undefined) {
			let data = this.props.data;
			return (
				<Container className='fullDataCell'>
					<Row>
						<Col>
							<h4 className='fullDataData'>
								{Capitalize.words(data.primary_type)}
							</h4>
						</Col>
					</Row>
					{data.description && (
						<Row>
							<Col>
								<h5 className='fullDataData'>
									{this.capitalizeFirstLetter(data.description)}.
								</h5>
							</Col>
						</Row>
					)}
					{data.date && (
						<Row>
							<Col>
								<h6 className='fullDataData'>
									{Moment(data.date, 'YYYY-MM-DDTHH:mm:ss.SSS').format('llll')}
								</h6>
							</Col>
						</Row>
					)}
					{data.case_number !== undefined && (
						<Row>
							<Col>
								Case Number:{' '}
								<span className='fullDataData'>{data.case_number}</span>
							</Col>
						</Row>
					)}
					<Row>
						{data.arrest !== undefined && (
							<Col sm={12} md={6}>
								Arrest:{' '}
								<span className='fullDataData'>
									{data.arrest === false ? 'No' : 'Yes'}
								</span>
							</Col>
						)}
						{data.domestic !== undefined && (
							<Col sm={12} md={6}>
								Domestic:{' '}
								<span className='fullDataData'>
									{data.domestic === false ? 'No' : 'Yes'}
								</span>
							</Col>
						)}
					</Row>
					{
						<Row>
							{data.latitude && (
								<Col sm={12} md={6}>
									Latitude:{' '}
									<span className='fullDataData'>
										{Numeral(data.latitude).format('0[.]00000')}
									</span>
								</Col>
							)}
							{data.longitude && (
								<Col sm={12} md={6}>
									Longitude:{' '}
									<span className='fullDataData'>
										{Numeral(data.longitude).format('0[.]00000')}
									</span>
								</Col>
							)}
						</Row>
					}
					{data.location_description !== undefined &&
						data.location_description !== '' && (
							<Row>
								<Col>
									Location Description:{' '}
									<span className='fullDataData'>
										{this.capitalizeFirstLetter(data.location_description)}
									</span>
								</Col>
							</Row>
						)}
					{data.block !== undefined && (
						<Row>
							<Col>
								Block: <span className='fullDataData'>{data.block}</span>
							</Col>
						</Row>
					)}
					{data.fbi_code !== undefined && (
						<Row>
							<Col>
								FBI Code: <span className='fullDataData'>{data.fbi_code}</span>
							</Col>
						</Row>
					)}
				</Container>
			);
		} else {
			return <div />;
		}
	}
}

export default CompleteDataDisplayRow;
