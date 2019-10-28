import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';
import BottomShare from '@/pages/activitys/appreciation/componts/bottom_share'
import NewShare from '@/pages/my/components/share/index'
import request from '@/services/request';
import wx from "weixin-js-sdk";

interface Props {
	onClick: (id: number) => any;
}

declare global {
	interface Window { open_id: string; pay_url: string; shareLink: string }
}
const Url = window.shareLink ? window.shareLink : 'http://mall.tdianyi.com/';

export interface Item {
	id?: number;
	coupons_name?: string;
	begin_time?: number;
	end_time?: number;
	return_money?: string;
	total_num?: number;
	image?: string;
	total_fee?: number;
	pay_money?: string;
	user_count?: number;
	store_name?: string;
	validity?: string;
	description?: any[];
	/**0兑换 1现金 */
	youhui_type?: number;
	/**状态 1:开启 2已暂停 3已删除 */
	publish_wait: number;
}

export default class MyCouponItem extends Component<Props & Item> {
	state = {
		showShare: false,
		showArrowUp:false
	}

	handleClick = () => this.props.id && this.props.onClick(this.props.id);

	shareClick = (e:any) => {//开启分享
		this.setState({ showShare: true })//启用组件
		// this.setState({ showArrowUp: true })//启用组件

		if (this.props.youhui_type == 0) {//兑换券
			wx.ready(() => {
				wx.updateAppMessageShareData({
					title: this.props.store_name + '正在派发' + this.props.return_money + '元兑换券，手慢无，速抢！',
					desc: '拼手速的时候来了，超值兑换券限量抢购，手慢就没了！速速戳进来一起领取！',
					link: Url + '#/business-pages/ticket-buy/index?id=' + this.props.id,
					imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
					success: function () {
					}
				})
			})
			e.stopPropagation();//需要一个穿透事件
		} else if (this.props.youhui_type == 1) {//现金券

			wx.ready(() => {
				wx.updateAppMessageShareData({
					title: '嘘，这里有一张' + this.props.return_money + '元现金券，悄悄领了，别声张！',
					desc: this.props.store_name + '又搞活动啦，是好友我才偷偷告诉你，现金券数量有限，领券要快姿势要帅！',
					link: Url + '#/business-pages/ticket-buy/index?id=' + this.props.id,
					imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
					success: function () {
						//成功后触发
					}
				})
			})
			e.stopPropagation();//需要一个穿透事件
		}//else

	}

	closeShare = (close: boolean) => {//关闭分享
		this.setState({ showShare: false })
	}

	render() {

		const useScale =
			this.props.total_num && this.props.user_count && (this.props.total_num / this.props.user_count) * 100;
		const leftMain =
			this.props.youhui_type === 1 ? (
				<Flex className="price-wrap" direction="column" justify="center">
					<div className="price">
						￥<span>{parseFloat(this.props.return_money || '0').toFixed(0)}</span>
					</div>
					<span className="info">满{this.props.total_fee}可用</span>
				</Flex>
			) : (
				<Flex className="price-wrap">
					<img src={this.props.image} />
				</Flex>
				);

		// const bottom_share = (
			// <BottomShare
			// 	closeShare={this.closeShare}
			// 	showShare={this.state.showShare}
			// 	type={{
			// 		id: this.props.id,
			// 		name:'优惠券',
			// 		storeName: this.props.store_name,
			// 		youhui_type: this.props.youhui_type,//0是兑换券 1是现金券
			// 		return_money: this.props.return_money
			// 	}}
			// 	showArrowUp={this.state.showArrowUp}
			// >{null}
			// </BottomShare>)

		const share = (
			<NewShare
				onclick={this.closeShare}
				show={this.state.showShare}
			>
				{null}
			</NewShare>
		)
		return (
			<Flex className={styles.coupon} onClick={this.handleClick}>
				{leftMain}
				<Flex.Item className="rightBox">
					<Flex className="main">
						<Flex.Item>
							<Flex className="title">
								<div className={this.props.youhui_type === 1 ? 'label money' : 'label coupon'}>
									{this.props.youhui_type === 0 && '优惠券'}
									{this.props.youhui_type === 1 && '现金券'}
								</div>
								<Flex.Item className="titleContent">{this.props.coupons_name}</Flex.Item>
							</Flex>
							<div className="right-info info">{this.props.validity}</div>
							<Flex className={styles.progress}>
								<div className="bar">
									<div className="line" style={{ width: `${useScale}%` }} />
								</div>
								<div className="number">
									{this.props.total_num}/{this.props.user_count}
								</div>
							</Flex>
						</Flex.Item>
						{this.props.publish_wait === 1 && <div className="createBannerBtn" onClick={this.shareClick.bind(this)}>分享</div>}
						{/* {this.props.publish_wait === 2 && <div className="stopBtn">已暂停发放</div>} */}
						{/* {this.props.publish_wait === 3 && <div className="stopBtn">已删除</div>} */}
					</Flex>
				</Flex.Item>
				{/* {bottom_share} */}
				{ share }
			</Flex>
		);
	}
}
