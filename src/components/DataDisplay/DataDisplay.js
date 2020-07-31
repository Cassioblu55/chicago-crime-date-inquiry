import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import "./DataDisplay.css";

import Container from 'react-bootstrap/Container';

class DataDisplay extends Component {
	render() {
    if(this.props.data !== undefined){
      return (
				<Container>
					<h6 className='text-center dataDisplayHeader'>{this.props.header}</h6>
					{this.props.data.map((row) => {
						return (
							<Row className="dataDisplayRow">
								<Col className='text-left'>{row.left}</Col>
								<Col className='text-right'>{row.right}</Col>
							</Row>
						);
					})}
				</Container>
			);
    }else{
      return <div></div>
    }
	}
}

export default DataDisplay;
