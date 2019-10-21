import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import { Toast, Flex, WingBlank, Button } from 'antd-mobile';
import DeleteActivity from '@/components/deleteActivity'
interface Props {
	name: string;
	begin_time: number;
	end_time: number;
	expire_day: number;
	is_superposition: number;
	return_money: string;
	use_sum: number;
	user_count: number;
	total_num: number;
	total_fee: number;
	location: any;
	coupon: any;
	coupon_id: number;
	query_id:number
}

export default class CouponCard extends Component<Props> {

	state = {
		showDeleteActivity:false
	}
	// 删除数据
	deleteData = async () => {
		// console.log('8878675');
		this.setState({
			showDeleteActivity:true
		})
	}

	showDeleteActivityData = (data:any) => {
		console.log(data,'实际收到的数据');
		this.setState({showDeleteActivity:false})
	}

	render() {
		const { showDeleteActivity } = this.state
		return (
			<div className={styles.couponCard}>
				<DeleteActivity
					show={showDeleteActivity}
					showDeleteActivity={this.showDeleteActivityData.bind(this)}
					coupon={this.props.coupon}
					coupon_id={this.props.coupon_id}
					query_id={this.props.query_id}
				/>
				<div className="price">¥ {this.props.return_money}</div>
				<div className="info">
					<span>满{this.props.total_fee}可用</span>
					<span>有效期{this.props.expire_day}天</span>
				</div>
				<ProgressBar title="库存" value={this.props.total_num / this.props.user_count * 100} label={this.props.total_num + '张'} />
				<ProgressBar title="已领" value={(this.props.user_count - this.props.total_num) / this.props.user_count * 100} label={(this.props.user_count - this.props.total_num) + '张'} />
				<ProgressBar title="已使用" value={this.props.use_sum / this.props.user_count * 100} label={this.props.use_sum + '张'} />
				<div className={styles.errbBox}>
					<img onClick={this.deleteData} src={require('../../../../assets/error_border.png')} alt="" />
				</div>

				
			</div>
		);
	}
}

interface ProgressBarProps {
	title: string;
	/**进度 1-100 */
	value: number;
	/**右边显示文字 */
	label: string;
}

class ProgressBar extends Component<ProgressBarProps> {
	render() {
		return (
			<div className={styles.progressBar}>
				
				<div className="title">{this.props.title}</div>
				<Flex>
					<div className="bar">
						<div className="line" style={{ width: this.props.value + '%' }} />
					</div>
					<div className="label">{this.props.label}</div>
				</Flex>
			</div>
		);
	}
}
