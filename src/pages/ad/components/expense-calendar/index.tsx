import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from '../../index.less';
import request from '@/services/request';

import moment from 'moment';

interface Props {
	// log: {};
	adId: null,
}

export default class ExpenseCalendar extends Component<Props> {
	state = {
		hasMore: true,
		// log : {},
		data: [],
		page: 1
	}

	componentDidMount() {
		this.setLog()
		// this.setState({
		// 	hasMore : this.props.log.data    // 根据data是否有数据来判断hasMore
		// })
	}

	setLog = async () => {
		const res = await request({ url: 'v3/ad_logs', params: { ad_id: this.props.adId, page: this.state.page } });
		console.log('res', res)
		if (res.code === 200 && res.data.length != 0) {
			this.setState({
				// log: this.state.log.concat,
				// log: res.data,
				// log : [].concat.call(this.state.log,res.data.data),	
				data: this.state.data.concat(res.data.data),
				hasMore: true
			});
		} else if (res.code === 200 && res.data.length == 0) {
			this.setState({
				hasMore: false
			})
		}
	};

	handleLoadMore = () => {
		if (this.state.hasMore) {
			this.setState({
				page: this.state.page + 1
			}, () => {
				this.setLog()
			})
		}
	}

	render() {
		console.log(this.state.data)
		const tableItems = this.state.data ? this.state.data.map(_ => (
			<Flex className={styles.tableItem} key={_.create_time}>
				<Flex.Item>{moment.unix(_.create_time).format('YYYY-MM-DD')}</Flex.Item>
				<span>{_.info}</span>
				<Flex.Item>{_.money}</Flex.Item>
			</Flex>
		)) : null;
		{
			/* <Flex className={styles.totalExpense} justify="end">
					总消耗：1.4
				</Flex> */
		}
		return (
			<WingBlank>
				<Flex className={styles.tableHead}>
					<Flex.Item>时间</Flex.Item>
					<span>事件</span>
					<Flex.Item>消耗</Flex.Item>
				</Flex>
				{tableItems}
				<p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
			</WingBlank>
		);
	}
}
