import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import './DataDisplayRow.css';

class DataDisplayRow extends Component {
	onClick = () => {
		let requestedData = {};
		this.props.onClickDataSend.map((key) => {
			requestedData[key] = this.props.data[key];
		});
		this.props.onClick(requestedData);
	};

	render() {
		return (
			<Row
				className={`dataDisplayRow ${this.props.rowClass} ${
					this.props.loading ? 'dataDisplayRowLoading' : 'dataDisplayRowReady'
				}`}
				onClick={this.onClick}>
				<Col className='text-left'>{this.props.index+1}. {this.props.data.left}</Col>
				<Col className='text-right'>{this.props.data.right}</Col>
			</Row>
		);
	}
}

export default DataDisplayRow;
