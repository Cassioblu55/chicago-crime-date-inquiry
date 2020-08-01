import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

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
			<Container>
				<Row
					className={`dataDisplayRow ${this.props.rowClass} ${
						this.props.loading ? 'dataDisplayRowLoading' : 'dataDisplayRowReady'
					}`}
					onClick={this.onClick}>
					<Col sm={9} md='auto' className='text-left'>
						<span className='text-left' style={{ fontWeight: '400', marginRight: "3px" }}>
							{this.props.index}.
						</span>
						{this.props.data.left}
					</Col>
					<Col className='text-right'>{this.props.data.right}</Col>
				</Row>
			</Container>
		);
	}
}

export default DataDisplayRow;
