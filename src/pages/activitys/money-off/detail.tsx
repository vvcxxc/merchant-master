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
		rules: [],
		startTime: '',
		endTime: ''
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
				this.setState({
					rules: res.data.more_decrease.map((_: any) => ({
						min: _.more,
						max: _.decrease,
						id: _.more_decrease_id
					})),
					startTime: res.data.activity.begin_time,
					endTime: res.data.activity.end_time
				});
			}
		}
	};

	handleRuleChange = (index: number, rule: never) => {
		// const rules = [...this.state.rules];
		// rules.splice(index, 1, rule);
		// this.setState({ rules });
	};

	handleDelete = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/activity/more_decrease/' + this.state.id, method: 'delete' });
		Toast.hide();
		if (res.code === 200) {
			Toast.success('删除成功');
			router.goBack();
		} else {
			Toast.show(res.data);
		}
	};

	handleRuleClick = async (index: number) => {
		const item: any = this.state.rules[index];
		if (item) {
			Toast.loading('');
			const res = await request({
				url: 'v3/activity/more_decrease_grade',
				method: 'delete',
				data: { activity_id: this.state.id, more_decrease_id: item.id }
			});
			Toast.hide();
			if (res.code === 200) {
				Toast.success('删除成功');
				this.getDetail();
			} else {
				Toast.fail(res.data);
			}
		}
	};

	render() {
		const rules = this.state.rules.map((_, index) => (
			<LimitItem
				{..._}
				key={index}
				index={index}
				onChange={this.handleRuleChange}
				onClick={this.handleRuleClick}
			/>
		));
		return (
			<Flex direction="column" className={styles.page}>
				<Flex.Item>
					<WingBlank>
						<Flex className={styles.headTitle}>
							<span className={styles.headLabel}>满</span>
							<div>满减活动</div>
							<Flex.Item className={styles.time}>
								{this.state.startTime}-{this.state.endTime}
							</Flex.Item>
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
