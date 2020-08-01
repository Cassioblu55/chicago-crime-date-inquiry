import React, { Component } from 'react';
import './DataDisplay.css';

import Container from 'react-bootstrap/Container';
import DataDisplayRow from './DataDisplayRow';

class DataDisplay extends Component {
	getSelected(row){
    let dataMatches = true;
    for(let key of Object.keys(this.props.rowSelectedData)){
      if(row[key] !== this.props.rowSelectedData[key]){
        dataMatches = false;
      }
    }
    return dataMatches ? "rowSelected" : '';
  };

	render() {
		if (this.props.data !== undefined) {
			return (
				<Container>
					<h6 className='text-center dataDisplayHeader'>{this.props.header}</h6>
					{this.props.data.map((row, index) => {
						return (
							<DataDisplayRow
								rowClass={this.getSelected(row)}
                key={index}
                index={index}
								loading={this.props.dateChangerLocked}
								onClick={this.props.onClick}
								onClickDataSend={this.props.onClickDataSend}
								data={row}
							/>
						);
					})}
				</Container>
			);
		} else {
			return <div></div>;
		}
	}
}

export default DataDisplay;
