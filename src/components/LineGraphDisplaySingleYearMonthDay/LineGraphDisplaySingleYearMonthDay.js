import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { ResponsiveLine } from '@nivo/line';
import Numeral from 'numeral';
import Moment from 'moment';
import Ordinal from 'ordinal';
import DataTotal from '../DataTotal';

class LineGraphDisplaySingleYearMonthDay extends Component {
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
								this.props.month,
								this.props.day
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
											<Col>
												{`${Moment(`${point.data.x}:00:00`, 'HH:mm:ss').format(
													'LT'
												)} - ${Moment(
													`${point.data.x}:59:59`,
													'HH:mm:ss'
												).format('LT')}`}
											</Col>
										</Row>
										<Row>
											<Col>Crimes: {Numeral(point.data.y).format('0,0')}</Col>
										</Row>
									</Container>
								);
							}}
							pointLabelYOffset={-12}
							useMesh={true}
							onClick={function(point){
								self.props.setSelectedSingleHour(point.data.x)
							}}
						/>
					</Row>
					<DataTotal
						header={`${Moment(
							`${this.props.year}-${this.props.month}-${this.props.day}`,
							'YYYY-MM-DD'
						).format('MMM Do')} Crimes`}
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
		data.forEach((element) => {
			total += element.amount;
		});
		return total;
	};

	createDisplayData(data, year, month, day) {
		let timeData = [];
		data.forEach((row) => {
			timeData.push({
				x: row.time,
				y: row.amount,
			});
		});
		return [
			{
				id: Moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('MMM Do'),
				data: timeData,
			},
		];
	}
}

export default LineGraphDisplaySingleYearMonthDay;
