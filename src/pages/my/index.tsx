/**title: 个人中心 */
import React, { Component } from 'react';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import request from '@/services/request';
import router from 'umi/router';
import ShareThree from './components/share_three/index'

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
			},
			showSharethree: false
		};

		/**跳转到页面 */
		pushPage = (pathname: string) => () => {
			// console.log(routerRedux)
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
    // /**我的签约码 */
		// goSignCode = () => {
		// 	router.push({
		// 		pathname: '/my/signCode',
		// 		query: {
		// 			url: this.state.info.wx_sign_url
		// 		}
		// 	})
		// }

		/**转到余额 */
		transferredBalance = () => {
			let money = Number(this.state.info.money);
			if (money > 0) {
        // if(money < 0.01){
        //   Toast.fail('提现金额必须大于')
        // }
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

		/**我的签约码 */
		// goSignCode = () => {
		// 	router.push({
		// 		pathname: '/my/signCode',
		// 		query: {
		// 			url: this.state.info.wx_sign_url
		// 		}
		// 	})
		// }

		//点击转发
		forwarding = () => {
			this.setState({ showSharethree:true})
		}

		//遮挡层组件 用户点击选择后触发
		closeShareThree = (close:boolean) => {
			this.setState({ showSharethree:false})
		}

		render() {
      // console.log(this.state.info.wx_sign_status)
			const signCode = this.state.info.wx_sign_status == 2 ? (
				<Flex onClick={this.goSignCode}>
					<img src={require('./signed.png')} alt="" />
					<span>我的签约码</span>
				</Flex>
      ) : null;
      const qianyue = this.state.info.wx_sign_status == 3 ? (
        <Flex className={styles.qianyue}><img src={require('@/assets/qianyue.png')}/></Flex>
      ) : null;
			return (
				<div className={styles.page}>
					<ShareThree show={this.state.showSharethree} onclick={this.closeShareThree.bind(this)} info={this.state.info}/>
					<div className={styles.headInfo}>
						<WingBlank>
							<Flex className={styles.headInfoContent}>
								<img src={this.state.info.preview} alt="" className="userImg" />
								<Flex.Item className="name" >{this.state.info.name}
									<img src={require('../../assets/share_button.png')} alt="" onClick={this.forwarding.bind(this)}/>
								</Flex.Item>
								<img
									src={require('./setting.png')}
									alt=""
									className="setting"
									onClick={this.pushPage('/myInfo')}
								/>
                {/* {qianyue} */}
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
							<span>我的优惠券</span>
						</Flex>
						<Flex onClick={this.pushPage('/my/moneyreceiveQr')}>
							<img src={require('./code.png')} alt="" />
							<span>我的收款码</span>
						</Flex>
						<Flex onClick={this.pushPage('/my/inviteQrCode')}>
							<img src={require('./benefit.png')} alt="" />
							<span>店铺邀请码</span>
						</Flex>
						{signCode}
					</WingBlank>
				</div>
			);
		}
	}
);
