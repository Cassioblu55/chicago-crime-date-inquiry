import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ResponsiveLine } from '@nivo/line';
import Moment from 'moment';
import Numeral from 'numeral';
import DataTotal from '../DataTotal';

import GetColor from '../../helpers/GetColor';
import LoadingSpinner from '../LoadingSpinner';

import './LineGraphDisplayAllYears.css';

class LineGraphDisplayAllYears extends Component {
	// Hou comment: we typically order the class methods in such a way that the render() method comes last. Take a look at the Airbnb style guide for some ideas on how to order your class methods: https://github.com/airbnb/javascript/tree/master/react#ordering
	render = () => {
		if (this.props.locked === false && this.props.data !== undefined) {
			let self = this;
			return (
				<Container>
					<Row style={{ height: `${this.props.graphHeight}px` }}>
						<ResponsiveLine
							data={this.createDisplayData(this.props.data)}
							margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
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
							colors={GetColor}
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
											<Col>{Moment(point.data.x, 'MM').format('MMM')}</Col>
											<Col>{Numeral(point.data.y).format('0,0')}</Col>
										</Row>
									</Container>
								);
							}}
							pointLabelYOffset={-12}
							useMesh={true}
							legends={[
								{
									anchor: 'bottom-right',
									direction: 'column',
									justify: false,
									translateX: 100,
									translateY: 35,
									itemsSpacing: 0,
									itemDirection: 'left-to-right',
									itemWidth: 80,
									itemHeight: 20,
									itemOpacity: 0.75,
									symbolSize: 12,
									symbolShape: 'circle',
									symbolBorderColor: 'rgba(0, 0, 0, .5)',
									onClick: function (data) {
										self.props.setSelectedSingleYear(data.id);
										self.props.setLineGraphColor(data.color);
									},
									effects: [
										{
											on: 'hover',
											style: {
												itemBackground: 'rgba(0, 0, 0, .03)',
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
					</Row>
					<DataTotal
						header='All Crime Reported'
						total={this.getTotal(this.props.data)}
					/>
				</Container>
			);
		} else {
			return <LoadingSpinner height={this.props.graphHeight} />;
		}
	};

	getTotal(data) {
		let total = 0;
		data.forEach((element) => {
			element.data.forEach((e) => {
				total += e.amount;
			});
		});
		return total;
	}

	createDisplayData(data) {
		return data.map((row, index) => {
			return {
				id: row.id,
				index: index,
				data: row.data
					.sort((a, b) => (a.month < b.month ? -1 : 1))
					.map((month) => {
						return { x: month.month, y: month.amount };
					}),
			};
		});
	}
}

export default LineGraphDisplayAllYears;
