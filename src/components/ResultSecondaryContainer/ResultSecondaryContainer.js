import React, { Component } from 'react';
import ResultSecondary from "./ResultSecondary/ResultSecondary"

class ResultSecondaryContainer extends Component {
  render() {
    return (
			<div className='resultSecondaryContainer'>
				<div className='resultSecondaryContainerColumn'>
					<ResultSecondary />
				</div>
				<div className='resultSecondaryContainerColumn'>
					<ResultSecondary />
				</div>
			</div>
		);
  }
}

export default ResultSecondaryContainer;
