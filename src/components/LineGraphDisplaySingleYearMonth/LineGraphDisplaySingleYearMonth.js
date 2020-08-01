import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { ResponsiveLine } from '@nivo/line';
import Numeral from 'numeral';
import Moment from 'moment';
import Ordinal from 'ordinal';
import DataTotal from '../DataTotal';

class LineGraphDisplaySingleYearMonth extends Component {
	render() {
		var self = this;
		if (this.props.data !== undefined && this.props.locked === false) {
			return (
				<Container>
					<Row style={{ height: `${this.props.graphHeight}px` }}>
						<ResponsiveLine
							data={this.createDisplayData(
								this.props.data,
								this.props.year,
								this.props.month
							)}
							margin={{ top: 10, right: 50, bottom: 50, left: 60 }}
							xScale={{ type: 'point' }}
							yScale={{
								type: 'linear',
								min: 'auto',
								max: 'auto',
								stacked: false,
								reverse: false,
							}}
							axisTop={null}
							axisRight={null}
							axisBottom={{
								orient: 'bottom',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: this.props.axisBottomLegend,
								legendOffset: 36,
								legendPosition: 'middle',
							}}
							axisLeft={{
								orient: 'left',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: this.props.axisLeftLegend,
								legendOffset: -50,
								legendPosition: 'middle',
							}}
							colors={this.props.color}
							pointSize={10}
							pointColor={{ theme: 'background' }}
							pointBorderWidth={2}
							pointBorderColor={{ from: 'serieColor' }}
							tooltip={function (data) {
								let point = data.point;
								return (
									<Container
										className='dataPointToolTip'
										style={{ border: point.borderColor + ' solid 2px' }}>
										<Row>
											<Col
												className='text-center dataPointToolTipHeader'
												style={{ color: point.borderColor }}>
												{point.serieId}
											</Col>
										</Row>
										<Row>
											<Col xs={9}>{`${Moment(
												`${self.props.year}-${self.props.month}-${point.data.x}`,
												'YYYY-MM-DD'
											).format('dddd')} the ${Ordinal(point.data.x)}`}</Col>
											<Col xs={3}>{Numeral(point.data.y).format('0,0')}</Col>
										</Row>
									</Container>
								);
							}}
							pointLabelYOffset={-12}
							useMesh={true}
							onClick={function (point) {
								//self.props.setSingleDay(point);
							}}
						/>
					</Row>
					<DataTotal
						header={`${Moment(
							`${self.props.year}-${self.props.month}`,
							'YYYY-MM'
						).format('MMMM YYYY')} Crimes`}
						total={this.getTotal(this.props.data)}
					/>
				</Container>
			);
		} else {
			return <LoadingSpinner height={this.props.graphHeight} />;
		}
	}

	getTotal = (data) => {
		let total = 0;
		console.log(data);
		data.forEach((element) => {
			total += element.amount;
		});
		return total;
	};

	createDisplayData(data, year, month) {
		let yearData = [];
		data.forEach((row) => {
			yearData.push({
				x: row.dayNumber,
				y: row.amount,
			});
		});
		return [
			{
				id: Moment(`${year}-${month}`, 'YYYY-MM').format('MMM-YYYY'),
				data: yearData,
			},
		];
	}
}

export default LineGraphDisplaySingleYearMonth;
