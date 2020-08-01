import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Container, Row } from 'react-bootstrap';
import './BarGraphDisplay.css';

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

class BarGraphDisplay extends Component {
	render() {
		if (this.props.data !== undefined) {
			return (
				<Container>
					<h3 className='text-center'>{this.props.header}</h3>
					<Row
						style={{ height: '400px' }}
						className={this.props.locked && 'graphLoading'}>
						<ResponsiveBar
							data={this.createDisplayData(this.props.data)}
							keys={Object.keys(this.props.data)}
							indexBy='keyDisplay'
							margin={{ top: 10, right: 130, bottom: 70, left: 60 }}
							padding={0.3}
							colors={getBarColor}
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
					</Row>
				</Container>
			);
		} else {
			return <div></div>;
		}
	}

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
