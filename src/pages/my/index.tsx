/**title: 个人中心 */
import React, { Component } from 'react';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import request from '@/services/request';

interface State {
	info: Info;
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
				bank_count: 1
			}
		};

		/**跳转到页面 */
		pushPage = (pathname: string) => () => this.props.dispatch(routerRedux.push({ pathname }));

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
						Toast.success(message, 1);
					} else {
						Toast.fail(message, 1);
					}
				});
			} else {
				Toast.fail('暂无平台收益', 1);
			}
		};

		render() {
			return (
				<div className={styles.page}>
					<div className={styles.headInfo}>
						<WingBlank>
							<Flex className={styles.headInfoContent}>
								<img src={this.state.info.preview} alt="" className="userImg" />
								<Flex.Item className="name">{this.state.info.name}</Flex.Item>
								<img
									src={require('./setting.png')}
									alt=""
									className="setting"
									onClick={this.pushPage('/myInfo')}
								/>
							</Flex>
						</WingBlank>
					</div>
					<WingBlank className={styles.treasure}>
						<div className="content">
							<Flex align="start">
								<Flex.Item className="benefit">
									<div className="label">平台收益</div>
									<div className="money">￥{this.state.info.money} </div>
								</Flex.Item>
								<div className="btn" onClick={this.transferredBalance}>
									转到余额
								</div>
							</Flex>
							<Flex className="bottom">
								<Flex.Item>
									<Flex
										direction="column"
										align="start"
										className="card"
										onClick={this.pushPage('/my/bank')}
									>
										<div>银行卡</div>
										<div>{this.state.info.bank_count}</div>
									</Flex>
								</Flex.Item>
								<div className="give" onClick={this.pushPage('/my/give')}>
									<div className="label">礼品币</div>
									<div className="value">{this.state.info.integral} </div>
								</div>
							</Flex>
						</div>
					</WingBlank>
					<WingBlank className={styles.list}>
						<Flex onClick={this.pushPage('/activitys')}>
							<img src={require('./activity.png')} alt="" />
							<span>我的活动</span>
						</Flex>
						<Flex onClick={this.pushPage('/my/coupon')}>
							<img src={require('./coupon.png')} alt="" />
							<span>我的兑换券</span>
						</Flex>
						<Flex onClick={this.pushPage('/my/moneyreceiveQr')}>
							<img src={require('./code.png')} alt="" />
							<span>我的收款码</span>
						</Flex>
						<Flex onClick={this.pushPage('/my/inviteQrCode')}>
							<img src={require('./benefit.png')} alt="" />
							<span>店铺邀请码</span>
						</Flex>
						<Flex>
							<img src={require('./signed.png')} alt="" />
							<span>我的签约码</span>
						</Flex>
					</WingBlank>
				</div>
			);
		}
	}
);
