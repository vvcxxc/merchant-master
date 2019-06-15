/** title: 满减活动详情 */

import React, { Component } from 'react';
import { WingBlank, Toast, Flex, Button } from 'antd-mobile';

import styles from './detail.less';
import request from '@/services/request';
import LimitItem from '../components/limit-item';
import router from 'umi/router';

/**满减活动详情 */
export default class MoneyOffDetail extends Component<any> {
	state = {
		/**当前详情id */
		id: 0,
		rules: [{}, {}, {}]
	};
	componentDidMount() {
		this.setState({ id: this.props.location.state.id }, this.getDetail);
	}
	/**获取详情 */
	getDetail = async () => {
		if (this.state.id) {
			Toast.loading('');
			const res = await request({ url: 'v3/activity/more_decrease_info/' + this.state.id });
			Toast.hide();
			if (res.code === 200) {
				this.setState({ detail: res.data });
			}
		}
	};

	handleRuleChange = (index: number, rule: any) => {
		const rules = [...this.state.rules];
		rules.splice(index, 1, rule);
		this.setState({ rules });
	};

	handleDelete = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/activity/more_decrease/' + this.state.id, method: 'delete' });
		Toast.hide();
		if (res.code === 200) {
			Toast.success('删除成功');
			router.goBack();
		}
	};
	render() {
		const rules = this.state.rules.map((_, index) => (
			<LimitItem {..._} key={index} index={index} onChange={this.handleRuleChange} />
		));
		return (
			<Flex direction="column" className={styles.page}>
				<Flex.Item>
					<WingBlank>
						<Flex className={styles.headTitle}>
							<span className={styles.headLabel}>满</span>
							<div>满减活动</div>
							<Flex.Item className={styles.time}>2019/04/12-2019/05/11</Flex.Item>
						</Flex>
						{rules}
					</WingBlank>
				</Flex.Item>
				<Button className={styles.btn} type="primary" onClick={this.handleDelete}>
					删除活动
				</Button>
			</Flex>
		);
	}
}
