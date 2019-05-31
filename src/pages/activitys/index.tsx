/**title: 我的活动 */

import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from './index.less';
import { ItemContent } from './itemContent';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

export default connect()(
  class ActivityPage extends Component<any> {
    state = {};

    /**跳转到页面 */
    pushPage = (pathname: string) => () => this.props.dispatch(routerRedux.push({ pathname }));
    render() {
      return (
        <div className={styles.page}>
          <WingBlank>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/payment')}>
              <img className="item-icon" src={require('./images/1.png')} alt="" />
              <Flex.Item>
                <ItemContent title="支付返券" subTitle="PAY COUPONS" />
              </Flex.Item>
            </Flex>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/money-off')}>
              <img className="item-icon" src={require('./images/2.png')} alt="" />
              <Flex.Item>
                <ItemContent title="满减活动" subTitle="WITH REDUCED" />
              </Flex.Item>
            </Flex>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/group')}>
              <img className="item-icon" src={require('./images/3.png')} alt="" />
              <Flex.Item>
                <ItemContent title="拼团活动" subTitle="GROUP ACTIVITIES" />
              </Flex.Item>
            </Flex>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/appreciation')}>
              <img className="item-icon" src={require('./images/4.png')} alt="" />
              <Flex.Item>
                <ItemContent title="增值活动" subTitle="VALUE ADDED" />
              </Flex.Item>
            </Flex>
          </WingBlank>
        </div>
      );
    }
  },
);
