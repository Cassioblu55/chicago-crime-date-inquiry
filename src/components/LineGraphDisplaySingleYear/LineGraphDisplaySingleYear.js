import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Numeral from 'numeral';
import Moment from 'moment';

import { ResponsiveLine } from '@nivo/line';

class LineGraphDisplaySingleYear extends Component {
	render() {
		if (this.props.data !== undefined) {
			let self = this;
			return (
				<Container>
					<Row style={{ height: '450px' }}>
						<ResponsiveLine
							data={this.createDisplayData(
								this.props.data,
								this.props.year
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
											<Col>{Moment(point.data.x, 'MM').format('MMM')}</Col>
											<Col>{Numeral(point.data.y).format('0,0')}</Col>
										</Row>
									</Container>
								);
							}}
							pointLabelYOffset={-12}
							useMesh={true}
						/>
					</Row>
				</Container>
			);
		} else {
			return <div />;
		}
	}

	createDisplayData(data, year, index) {
    let yearData = [];
    data.forEach((row) =>{
      yearData.push({ x: row.monthNumber, y: row.amount});
    });
			return [
				{
          id: year,
					data: yearData,
				},
			];
		}
}

export default LineGraphDisplaySingleYear;
