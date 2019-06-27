import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';

export default class NoData extends Component {
	toCreateCoupon = () => router.push('/my/coupon/create');

	render() {
		return (
			<Flex justify="center" align="center" direction="column" className={styles.noDataPage}>
				<img className={styles.noData} src={require('./coupon.png')} alt="" />
				<div className={styles.noDataTip}>
					暂无兑换券 <span onClick={this.toCreateCoupon}>快去添加吧>></span>
				</div>
			</Flex>
		);
	}
}
