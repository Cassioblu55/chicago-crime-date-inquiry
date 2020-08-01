import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ResponsiveLine } from '@nivo/line';
import Moment from 'moment';
import Numeral from 'numeral';

import './LineGraphDisplay.css';

const COLORS = [
	'#8783D1',
	'#AA9ABA',
	'#BFA4A4',
	'#D1ABAD',
	'#E3B9BC',
	'#A63A50',
	'#012622',
	'#012622',
	'#003B36',
	'#59114D',
	'#42033D',
];

const getBarColor = (bar) => {
	if (bar.index < COLORS.length) {
		return COLORS[bar.index];
	}
	let offSet = COLORS.length;
	while (bar.index - offSet >= COLORS.length) {
		offSet += COLORS.length;
	}
	return COLORS[bar.index - offSet];
};

class LineGraphDisplay extends Component {
	render() {
		if (this.props.data !== undefined) {
			let data = this.createDisplayData(this.props.data);
			let self = this;
			return (
				<Container>
					<h3 className='text-center'>{this.props.header}</h3>
					<Row style={{ height: '450px' }}>
						<ResponsiveLine
							data={data}
							margin={{ top: 30, right: 110, bottom: 50, left: 60 }}
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
							colors={getBarColor}
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
                  onClick: function(data){
                    console.log(data)
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
				</Container>
			);
		} else {
			return <div />;
		}
	}

	getToolTip(data) {
		console.log(data);
		return (
			<div className='dataPointToolTip'>
				<div>{data.point.serieId}</div>
			</div>
		);
	}

	// point:
	// borderColor: "#e8c1a0"
	// color: "transparent"
	// data:
	// label: "foo"
	// x: 9
	// xFormatted: 9
	// y: 38265
	// yFormatted: 38265
	// __proto__: Object
	// id: "2007.8"
	// index: 80
	// serieColor: "#e8c1a0"
	// serieId: "2007"
	// x: 197.27272727272728
	// y: 70

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

export default LineGraphDisplay;
