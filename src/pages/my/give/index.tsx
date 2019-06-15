/**title: 我的礼品币 */
import React, { Component } from 'react';
import { Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import MyGiveList from './list';

export default class MyGive extends Component {
	render() {
		return (
			<Flex className={styles.page} direction="column">
				<Flex className="head" justify="center">
					<Flex direction="column">
						<div className="value">190999</div>
						<span>当前可用</span>
					</Flex>
					<Flex direction="column">
						<div className="value">190</div>
						<span>冻结</span>
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
								<MyGiveList />
							</WingBlank>
						</Flex.Item>
					</Flex>
				</Flex.Item>
			</Flex>
		);
	}
}
