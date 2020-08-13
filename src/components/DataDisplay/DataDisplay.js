import React, { Component } from 'react';
import './DataDisplay.css';

import Container from 'react-bootstrap/Container';
import DataDisplayRow from './DataDisplayRow';
import LoadingSpinner from '../LoadingSpinner';

class DataDisplay extends Component {
	getSelected(row) {
		let dataMatches = true;
		for (let key of Object.keys(this.props.rowSelectedData)) {
			if (row[key] !== this.props.rowSelectedData[key]) {
				dataMatches = false;
			}
		}
		return dataMatches ? 'rowSelected' : '';
	}

	render() {
		if (this.props.data !== undefined) {
			return (
				{/* Hou comment: consider applying styles with a css selector in an external stylesheet rather than inlining the styles */}
				<Container style={{ marginBottom: '15px' }}>
					<h6 className='text-center dataDisplayHeader'>{this.props.header}</h6>
					{this.props.data.map((row, index) => {
						return (
							<DataDisplayRow
								rowClass={this.getSelected(row)}
								key={index}
								index={index + 1}
								locked={this.props.locked}
								onClick={this.props.onClick}
								onClickDataSend={this.props.onClickDataSend}
								data={row}
							/>
						);
					})}
				</Container>
			);
		} else {
			return <LoadingSpinner height={this.props.loadingContainerHeight} />;
		}
	}
}

export default DataDisplay;
