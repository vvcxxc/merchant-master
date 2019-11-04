/**title: 核销记录 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Toast } from 'antd-mobile';
import VerificationItem, { Item } from './item';
import request from '@/services/request';

export default class Verification extends Component {
	state = { 
		data: [],
		hasMore : true,
		page : 1
	};
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({ 
			url: 'v3/activity/verificationList',
			params : {
				page : this.state.page
			}
		});
		Toast.hide();
		if (res.code === 200 && res.data.length != 0) {
			this.setState({ data: this.state.data.concat(res.data) });
		}else if(res.code == 200 && res.data.length == 0) {
			this.setState({ hasMore : false })
		}
	};
	handleLoadMore() {
		if(this.state.hasMore) {
			this.setState({
				page : this.state.page + 1
			},() => {
				this.getData()
			})
		}
	}
	render() {
		const list = this.state.data.map((_: Item) => <VerificationItem key={_.id} {..._} />);
		return (
			<div className={styles.page}>
				<WingBlank>
					{list}
				</WingBlank>
				<p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
			</div>
		);
	}
}
