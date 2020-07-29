import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const hexChars = '23456789ABD';

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

const getRandomColor = () => {
	return `#${Array.from({ length: 6 })
		.map(() => hexChars[Math.floor(Math.random() * 11)])
		.join('')}`;
};

const getBarColor = (bar) => {
	console.log(bar);
	if (bar.index < COLORS.length) {
		return COLORS[bar.index];
	} else {
		return getRandomColor();
	}
};

class GraphDisplay extends Component {
	render() {
		if (this.props.data !== undefined) {
			console.log(this.props.data);
			return (
				<div style={{ height: '500px' }}>
					<ResponsiveBar
						data={this.createDisplayData(this.props.data)}
						keys={['amount']}
						indexBy='key'
						margin={{ top: 0, right: 130, bottom: 125, left: 60 }}
						padding={0.3}
						colors={getBarColor}
						defs={[
							{
								id: 'dots',
								type: 'patternDots',
								background: 'inherit',
								color: '#38bcb2',
								size: 4,
								padding: 1,
								stagger: true,
							},
							{
								id: 'lines',
								type: 'patternLines',
								background: 'inherit',
								color: '#eed312',
								rotation: -45,
								lineWidth: 6,
								spacing: 10,
							},
						]}
						fill={[
							{
								match: {
									id: 'lines',
								},
								id: 'dots',
							},
							{
								match: {
									id: 'sandwich',
								},
								id: 'lines',
							},
						]}
						borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
						axisTop={null}
						axisRight={null}
						axisBottom={{
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 20,
							legend: this.props.axisBottomLegend,
							legendPosition: 'middle',
							legendOffset: 75,
						}}
						axisLeft={{
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: this.props.axisLeftLegend,
							legendPosition: 'middle',
							legendOffset: -40,
						}}
						labelSkipWidth={12}
						labelSkipHeight={12}
						labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
						animate={true}
						motionStiffness={90}
						motionDamping={15}
					/>
				</div>
			);
		} else {
			return <div></div>;
		}
	}

	createDisplayData = (data) => {
		const displayData = [];
		Object.keys(data).forEach((key) => {
			displayData.push({
				key: key,
				amount: data[key],
				fill: '#61cdbg',
			});
		});
		return displayData.sort(function (a, b) {
			var x = a['amount'];
			var y = b['amount'];
			return x > y ? -1 : x < y ? 1 : 0;
		});
	};
}

export default GraphDisplay;
