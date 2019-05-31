/**title: 个人中心 */
import React, { Component } from 'react';
import { Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

export default connect()(
  class MyPage extends Component<any> {
    /**跳转到页面 */
    pushPage = (pathname: string) => () => this.props.dispatch(routerRedux.push({ pathname }));
    render() {
      return (
        <div className={styles.page}>
          <div className={styles.headInfo}>
            <WingBlank>
              <Flex className={styles.headInfoContent}>
                <img src="" alt="" className="userImg" />
                <Flex.Item className="name">店铺的名称</Flex.Item>
                <img src="" alt="" className="setting" />
              </Flex>
            </WingBlank>
          </div>
          <WingBlank className={styles.treasure}>
            <div className="content">
              <Flex align="start">
                <Flex.Item className="benefit">
                  <div className="label">平台收益</div>
                  <div className="money">￥23,280.00 </div>
                </Flex.Item>
                <div className="btn">提额</div>
              </Flex>
              <Flex className="bottom">
                <Flex.Item>
                  <Flex direction="column" className="card">
                    <div>银行卡</div>
                    <div>1</div>
                  </Flex>
                </Flex.Item>
                <div className="give" onClick={this.pushPage('/my/give')}>
                  <div className="label">礼品币</div>
                  <div className="value">23,280.00 </div>
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
            <Flex>
              <img src={require('./code.png')} alt="" />
              <span>我的收款码</span>
            </Flex>
            <Flex>
              <img src={require('./benefit.png')} alt="" />
              <span>我的创客收益</span>
            </Flex>
          </WingBlank>
        </div>
      );
    }
  },
);
