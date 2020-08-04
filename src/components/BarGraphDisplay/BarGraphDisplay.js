import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Container, Row, Col } from 'react-bootstrap';
import './BarGraphDisplay.css';
import GetColor from '../../helpers/GetColor';
import LoadingSpinner from '../LoadingSpinner';
import DataTotal from '../DataTotal';

class BarGraphDisplay extends Component {
	render = () => {
		if (this.props.data !== undefined) {
			return (
				<Container>
					<Row className={this.props.locked && 'graphLoading'}>
						<Col style={{ height: this.props.graphHeight }}>
							<ResponsiveBar
								data={this.createDisplayData(this.props.data)}
								keys={Object.keys(this.props.data)}
								indexBy='keyDisplay'
								margin={{ top: 10, right: 50, bottom: 70, left: 60 }}
								padding={0.3}
								colors={GetColor}
								borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
								axisTop={null}
								axisRight={null}
								axisBottom={{
									tickSize: 5,
									tickPadding: 5,
									tickRotation: 90,
									legend: this.props.axisBottomLegend,
									legendPosition: 'middle',
									legendOffset: 53,
								}}
								axisLeft={{
									tickSize: 5,
									tickPadding: 5,
									tickRotation: 0,
									legend: this.props.axisLeftLegend,
									legendPosition: 'middle',
									legendOffset: -52,
								}}
								labelSkipWidth={12}
								labelSkipHeight={12}
								labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
								animate={true}
								motionStiffness={90}
								motionDamping={15}
							/>
						</Col>
					</Row>
				</Container>
			);
		} else {
			return <LoadingSpinner height={this.props.graphHeight} />;
		}
	};

	createDisplayData = (data) => {
		const displayData = [];
		let activeDisplayKeys = [];
		Object.keys(data).forEach((key) => {
			let column = {};
			column[key] = data[key];
			column.amount = data[key];
			let newColumnData = this.getKeyDisplay(key, activeDisplayKeys);
			column.keyDisplay = newColumnData.keyDisplay;
			activeDisplayKeys = newColumnData.activeDisplayKeys;
			displayData.push(column);
		});
		return displayData;
	};

	getKeyDisplay(key, activeDisplayKeys) {
		if (key.length > 4) {
			key = key.replace(' ', '');
			let keyDisplay = key.substring(0, 4);
			let offSet = 1;
			while (activeDisplayKeys.includes(keyDisplay)) {
				let max = key.length < 4 + offSet ? key.length : 4 + offSet;
				keyDisplay = key.substring(0 + offSet, max);
				offSet++;
			}
			activeDisplayKeys.push(keyDisplay);
			return { keyDisplay, activeDisplayKeys };
		} else {
			return key;
		}
	}
}

export default BarGraphDisplay;
