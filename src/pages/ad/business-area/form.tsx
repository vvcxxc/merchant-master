import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button } from 'antd-mobile';

import styles from '../index.less';
import router from 'umi/router';

export default class From extends Component {
	handleToRechange = () => router.push('/my/rechange');
	render() {
		return (
			<WingBlank className={styles.maxheight}>
				<Flex direction="column" className={styles.maxheight}>
					<Flex.Item>
						<List>
							<List.Item extra="请选择优惠券" arrow="horizontal">
								优惠券
							</List.Item>
							<InputItem type="money" placeholder="广告投放时长">
								广告投放时长
							</InputItem>
							<InputItem extra="元" type="money">
								每日预算
							</InputItem>
						</List>
						<Flex justify="end" className={styles.tip}>
							若余额不足将暂停广告,
							<span className={styles.link} onClick={this.handleToRechange}>
								点击充值
							</span>
						</Flex>
					</Flex.Item>
					<Button type="primary" className={styles.submitBtn}>
						投放
					</Button>
				</Flex>
			</WingBlank>
		);
	}
}
