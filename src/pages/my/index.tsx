/**title: 个人中心 */
import React, { Component } from 'react';
import { Flex, WingBlank, Toast, List, Modal } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import request from '@/services/request';
import router from 'umi/router';
import ShareThree from './components/share_three/index'

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

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
        apply_store_status: { store_open_status: 0 },
        payment_status: { payment_open_status: 0 },
        money: '',
        wx_sign_url: '0',
        integral: 0,
        canInvite: 0,
        bank_count: 1,
        me_money: 0,
        is_existence: 0,  // 添加身份证和银行卡
        is_sq: 0,         // 双乾审核状态
        sq_failure: "",        // 双乾审核失败原因
        is_card_activation: 0, // 绑卡激活状态
        is_opening: 0,         // 提现状态
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
        this.setState({ info: res.data }, () => { console.log(this.state) });
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
          let info;
          if (res.data && res.data[0]) {
            info = res.data[0];
          } else {
            info = message;
          }
          if (res.code == 200) {
            let resetData = Object.assign({}, this.state.info, {
              me_money: Number(Number(this.state.info.me_money) + Number(this.state.info.money) - Number(Number(this.state.info.money) % 1)).toFixed(2),
              money: Number(Number(this.state.info.money) % 1).toFixed(4)
            })
            this.setState({
              info: resetData
            })
            Toast.success(info, 1.5);
          } else {
            Toast.fail(info, 1.5);
          }
        });
      } else {
        Toast.fail('暂无平台收益', 1.5);
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

    // /**我的签约码 */
    // goSignCode = () => {
    //   router.push({
    //     pathname: '/my/signCode',
    //     query: {
    //       url: this.state.info.wx_sign_url
    //     }
    //   })
    // }

    /**
     * 我的签约码
     */
    handleContractCode = () => {
      // 商店状态和支付状态其中一个不为3就去提交资料
      // 商店状态和支付状态都为3待审核
      // 商店状态和支付状态和微信状态都为3待签约

      const { wx_sign_status, apply_store_status, payment_status } = this.state.info;
      // console.log(apply_store_status,payment_status)

      if (apply_store_status.store_open_status != 3 || payment_status.payment_open_status != 3) {
        alert('签约提示', '当前未提交商家资料信息，无法进行签约', [
          { text: '忽略' },
          { text: '去提交', onPress: () => router.push('/submitQua') },
        ])
      } else if (apply_store_status.store_open_status == 3 && payment_status.payment_open_status == 3 && wx_sign_status == 3) {
        alert('签约提示', '当前提交注册微信特约商户，已通过审核，请进行签约信息确认', [
          { text: '忽略' },
          { text: '去签约', onPress: () => router.push('/my/contractCode') },
        ])
      } else if (apply_store_status.store_open_status == 3 && payment_status.payment_open_status == 3 && wx_sign_status == 4) {
        router.push('/my/contractCode')
      } else if (apply_store_status.store_open_status == 3 && payment_status.payment_open_status == 3) {
        alert('签约提示', '当前提交商户资料待审核，请稍后在我的签约码查询状态，如更新为“待签约”，即可进入下一步', [
          { text: '关闭' },
        ])
      }
    }

    handleWithDraw = () => {
      const { is_existence, is_sq, sq_failure, is_card_activation, is_opening } = this.state.info;
      if (is_existence == 1) {
        if (is_sq == 1) {
          if (is_card_activation == 0) {
            router.push('/doubledry/bindcard')
          } else if (is_card_activation == 1 && is_opening == 0) {
            router.push('/doubledry/withdraw')
          } else if (is_card_activation == 1 && is_opening == 1) {
            router.push('/my/withdraw')
          }
        } else {
          router.push('/doubledry/audit')
        }
      } else if (is_existence == 0) {
        router.push('/doubledry/register')
      }
    }

    handleRouteMyBank = () => {
      // () => router.push('/my/bank')
      const { is_sq } = this.state.info;
      if(is_sq == 1) {
        router.push('/my/bank')
      }else { 
        router.push('/doubledry/bankaudit')
      }
    }

    render() {
      // const signCode = this.state.info.wx_sign_status == 2 ? (
      //   <Item
      //     arrow="horizontal"
      //     thumb={require('@/assets/my/activity.png')}
      //     multipleLine
      //     onClick={this.goSignCode}
      //     className={styles.my_items}
      //   >
      //     我的签约码
      // 	</Item>
      // ) : null;
      const { wx_sign_status } = this.state.info;
      const contractCodeStatus = wx_sign_status == 0 ? "未提交资料" : wx_sign_status == 1 ? "审核中" : wx_sign_status == 2 ? "已驳回" : wx_sign_status == 3 ? "待签约" : wx_sign_status == 4 ? "已完成" : "";
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
            <Flex justify="between" className={styles.head_info_wrap} align='center'>
              <Flex className={styles.head_info} align='center'>
                <img src={this.state.info.preview} alt="" className="userImg" />
                <div className={styles.user_info}>
                  <div className={styles.user_name}>{this.state.info.name}</div>
                  {/* <div className={styles.last_login_time}>上次登录前天</div> */}
                </div>
              </Flex>
              {/* <img src={require('@/assets/my/arrow_icon.png')} alt="" className={styles.arrow_icon} /> */}
            </Flex>
            <div className={styles.user_money}>
              <div className={styles.count_balance}>
                <div className={styles.count_balance_wrap}>
                  <div className={styles.count_balance_title}>账户余额</div>
                  <div className={styles.count_balance_money}>{this.state.info.me_money}</div>
                </div>
                <div className={styles.count_balance_btn}>
                  <div className={styles.count_balance_invest} onClick={() => router.push('/my/rechange')}>充值</div>
                  <div className={styles.count_balance_withdraw} onClick={this.handleWithDraw}>提现</div>
                </div>
              </div>
              <div className={styles.platform_revenu}>
                <div className={styles.platform_revenu_wrap}>
                  <div className={styles.platform_revenu_title}>平台收益</div>
                  <div className={styles.platform_revenu_money}>{this.state.info.money ? this.state.info.money : '0.00'}</div>
                </div>
                <div className={styles.platform_revenu_btn}>
                  <div className={styles.platform_revenu_transfer_account} onClick={this.transferredBalance}>转到余额</div>
                </div>
              </div>
            </div>
            <div className={styles.user_bank_gift}>
              <div className={styles.user_bank} onClick={this.handleRouteMyBank}>
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
            <Item
              arrow="horizontal"
              thumb={require('@/assets/my/cloud_voice_box.png')}
              multipleLine
              onClick={this.pushPage('/loudspeaker')}
              className={styles.my_items}
            >
              我的云音箱
						</Item>
            {/* {signCode} */}
            {
              wx_sign_status != 0 ? (
                <Item
                  arrow="horizontal"
                  thumb={require('@/assets/my/my_contract_code.png')}
                  multipleLine
                  extra={contractCodeStatus}
                  className={styles.my_items}
                  onClick={this.handleContractCode.bind(this)}
                >
                  我的签约码
                </Item>
              ) : ""
            }

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
