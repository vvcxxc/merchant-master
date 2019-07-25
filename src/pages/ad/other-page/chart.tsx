import React, { Component } from 'react';
import AdChart from '../components/ad-chart';

export default class Chart extends Component {
	// render() {
	// 	return <div>///</div>;
	// }
	render() {
		return (
			<div>
				<p>{this.props.adId}</p>
				<AdChart adId={this.props.adId} />
			</div>
			
		);
	}
}
