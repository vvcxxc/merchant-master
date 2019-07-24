/**title: 我的活动 */

import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from './index.less';
import { ItemContent } from './itemContent';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import router from 'umi/router';

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
                <ItemContent title="支付返券" subTitle="PAY COUPONS"  />
                <div className="item-read">
                  <div className="item-read-msg" onClick={(e) => { router.push('/activitys/readme/payCoupons');e.stopPropagation(); }}>
                    创建必读
                  </div>
                </div>
              </Flex.Item>
            </Flex>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/money-off')}>
              <img className="item-icon" src={require('./images/2.png')} alt="" />
              <Flex.Item>
                <ItemContent title="满减活动" subTitle="WITH REDUCED" />
                <div className="item-read">
                  <div className="item-read-msg" onClick={(e) => { router.push('/activitys/readme/fullReduction');e.stopPropagation(); }}>
                    创建必读
                  </div>
                </div>
              </Flex.Item>
            </Flex>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/group')}>
              <img className="item-icon" src={require('./images/3.png')} alt="" />
              <Flex.Item>
                <ItemContent title="拼团活动" subTitle="GROUP ACTIVITIES" />
                <div className="item-read">
                  <div className="item-read-msg" onClick={(e) => { router.push('/activitys/readme/activityGroup');e.stopPropagation(); }}>
                    创建必读
                  </div>
                </div>
              </Flex.Item>
            </Flex>
            <Flex className="activity-item" onClick={this.pushPage('/activitys/appreciation')}>
              <img className="item-icon" src={require('./images/4.png')} alt="" />
              <Flex.Item>
                <ItemContent title="增值活动" subTitle="VALUE ADDED" />
                <div className="item-read">
                  <div className="item-read-msg" onClick={(e) => { router.push('/activitys/readme/activityAppre');e.stopPropagation(); }}>
                    创建必读
                  </div>
                </div>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </div>
      );
    }
  },
);
