/**title: 个人中心 */
import React, { Component } from 'react';
import { Flex, WingBlank, Toast, List } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import request from '@/services/request';
import router from 'umi/router';
import ShareThree from './components/share_three/index'

const Item = List.Item;
const Brief = Item.Brief;

interface State {
	info: Info;
	showSharethree: boolean;
}

interface Info {
	id: number;
	name: string;
	preview: string;
	wx_sign_status: number;
	money: string;
	wx_sign_url: string;
	integral: number;
	canInvite: number;
	bank_count: number;
	me_money: number;
}

export default connect()(
	class MyPage extends Component<any, State> {
		state = {
			info: {
				id: 0,
				name: '',
				preview: '',
				wx_sign_status: 0,
				money: '',
				wx_sign_url: '0',
				integral: 0,
				canInvite: 0,
				bank_count: 1,
				me_money: 0
			},
			showSharethree: false
		};

		/**跳转到页面 */
		pushPage = (pathname: string) => () => {
			this.props.dispatch(routerRedux.push({ pathname }))
		};

		componentDidMount() {
			this.getMyInfo();
		}

		getMyInfo = async () => {
			Toast.loading('');
			const res = await request({
				url: 'api/merchant/supplier/info'
			});
			Toast.hide();
			if (res.code === 200) {
				this.setState({ info: res.data });
			}
		};

		/**转到余额 */
		transferredBalance = () => {
			let money = Number(this.state.info.money);
			if (money > 0) {
				request({
					url: 'api/merchant/staff/earnings_go_balance',
					method: 'post'
				}).then(res => {
					let { data, message } = res;
					if (data[0]) {
						let resetData = Object.assign({}, this.state.info, { money: Number(0.0000).toFixed(4) })
						this.setState({
							info: resetData
						})
						Toast.success(message, 1);
					} else {
						Toast.fail(message, 1);
					}
				});
			} else {
				Toast.fail('暂无平台收益', 1);
			}
		};

		//点击转发
		forwarding = () => {
			this.setState({ showSharethree: true })
		}

		//遮挡层组件 用户点击选择后触发
		closeShareThree = (close: boolean) => {
			this.setState({ showSharethree: false })
		}

		render() {
			const signCode = this.state.info.wx_sign_status == 2 ? (
				<Item
					arrow="horizontal"
					thumb={require('@/assets/my/activity.png')}
					multipleLine
					onClick={this.goSignCode}
					className={styles.my_items}
				>
					我的签约码
				</Item>
			) : null;
			return (
				<div className={styles.page}>
					{/* <ShareThree show={this.state.showSharethree} onclick={this.closeShareThree.bind(this)} info={this.state.info} />
					<div className={styles.headInfo}>
						<WingBlank>
							<Flex className={styles.headInfoContent}>
								<img src={this.state.info.preview} alt="" className="userImg" />
								<Flex.Item className="name" >{this.state.info.name}
									<img src={require('../../assets/share_button.png')} alt="" onClick={this.forwarding.bind(this)} />
								</Flex.Item>
								<img
									src={require('./setting.png')}
									alt=""
									className="setting"
									onClick={this.pushPage('/myInfo')}
								/>
							</Flex>
						</WingBlank>
					</div> */}
					<div className={styles.head_info_content}>
						<Flex justify="between" className={styles.head_info_wrap}>
							<div className={styles.head_info}>
								<img src={this.state.info.preview} alt="" className="userImg" />
								<div className={styles.user_info}>
									<div className={styles.user_name}>{this.state.info.name}</div>
									<div className={styles.last_login_time}>上次登录前天</div>
								</div>
							</div>
							<img src={require('@/assets/my/arrow_icon.png')} alt="" className={styles.arrow_icon} />
						</Flex>
						<div className={styles.user_money}>
							<div className={styles.count_balance}>
								<div className={styles.count_balance_wrap}>
									<div className={styles.count_balance_title}>账号余额</div>
									<div className={styles.count_balance_money}>{this.state.info.me_money}</div>
								</div>
								<div className={styles.count_balance_btn}>
									<div className={styles.count_balance_invest} onClick={() => router.push('/my/rechange')}>充值</div>
									<div className={styles.count_balance_withdraw} onClick={() => router.push('/my/withdraw')}>提现</div>
								</div>
							</div>
							<div className={styles.platform_revenu}>
								<div className={styles.platform_revenu_wrap}>
									<div className={styles.platform_revenu_title}>平台收益</div>
									<div className={styles.platform_revenu_money}>{this.state.info.money ? this.state.info.money:'0.00'}</div>
								</div>
								<div className={styles.platform_revenu_btn}>
									<div className={styles.platform_revenu_transfer_account} onClick={this.transferredBalance}>转到余额</div>
								</div>
							</div>
						</div>
						<div className={styles.user_bank_gift}>
							<div className={styles.user_bank} onClick={() => router.push('/my/bank')}>
								<div className={styles.bank_num}>{this.state.info.bank_count}</div>
								<div className={styles.bank_title}>银行卡</div>
							</div>
							<div className={styles.user_gift}>
								<div className={styles.gift_num}>{this.state.info.integral}</div>
								<div className={styles.gift_title}>礼品币</div>
							</div>
						</div>
					</div>
					<List className={styles.my_info_items}>
						<Item
							arrow="horizontal"
							thumb={require('@/assets/my/activity.png')}
							multipleLine
							onClick={this.pushPage('/activitys')}
							className={styles.my_items}
						>
							我的活动
						</Item>
						<Item
							arrow="horizontal"
							thumb={require('@/assets/my/coupon.png')}
							multipleLine
							onClick={this.pushPage('/my/coupon')}
							className={styles.my_items}
						>
							我的优惠券
						</Item>
						<Item
							arrow="horizontal"
							thumb={require('@/assets/my/benefit.png')}
							multipleLine
							onClick={this.pushPage('/my/inviteQrCode')}
							className={styles.my_items}
						>
							店铺邀请
						</Item>
						<Item
							arrow="horizontal"
							thumb={require('@/assets/my/code.png')}
							multipleLine
							onClick={this.pushPage('/my/moneyreceiveQr')}
							className={styles.my_items}
						>
							我的收款码
						</Item>
						<Item
							arrow="horizontal"
							thumb={require('@/assets/my/lucky_writeoff_record.png')}
							multipleLine
							onClick={this.pushPage('/verificationPrize')}
							className={styles.my_items}
						>
							抽奖核销记录
						</Item>
						{/* <Item
							arrow="horizontal"
							thumb={require('@/assets/my/cloud_voice_box.png')}
							multipleLine
							onClick={this.pushPage('/loudspeaker')}
							className={styles.my_items}
						>
							我的云音箱
						</Item> */}
						{signCode}
					</List>
					<List className={styles.my_info_items}>
						<Item
							arrow="horizontal"
							thumb={require('@/assets/my/setting.png')}
							multipleLine
							onClick={this.pushPage('/myInfo')}
							className={styles.my_items}
						>
							设置
						</Item>
					</List>
				</div >
			);
		}
	}
);
