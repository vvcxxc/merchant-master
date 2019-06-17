/**title: 我的礼品币 */
import React, { Component } from 'react';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import MyGiveList from './list';
import request from '@/services/request';

export default class MyGive extends Component {
	state = { data: [], integral: 0 };
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'api/merchant/integral_logs' });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data, integral: res.integral_count });
		}
	};
	render() {
		return (
			<Flex className={styles.page} direction="column">
				<Flex className="head" justify="center">
					<Flex direction="column">
						<div className="value">{this.state.integral}</div>
						<span>当前可用</span>
					</Flex>
				</Flex>
				<Flex.Item>
					<Flex className="page-content" direction="column">
						<Flex className="content-head">
							<img src={require('./icon.png')} alt="" />
							<span>积分记录</span>
						</Flex>
						<Flex.Item>
							<WingBlank style={{ height: '100%' }}>
								<MyGiveList list={this.state.data} />
							</WingBlank>
						</Flex.Item>
					</Flex>
				</Flex.Item>
			</Flex>
		);
	}
}

const rightItem = (
	<Flex direction="column">
		<div className="value">190</div>
		<span>冻结</span>
	</Flex>
);
