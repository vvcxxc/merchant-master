/**title: 团卖物联 */

import React, { useState } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon } from 'antd-mobile';
import verificationImage from '../assets/varied/verification@2x.png';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

export default connect()(function IndexPage({ dispatch }: any) {
  /**是否显示核销的界面 */
  const [showVerification, setShowVerification] = useState(false);

  /**核销 */
  const handleVerification = () => setShowVerification(!showVerification);
  /** */
  const goLogin = () => {
    dispatch(routerRedux.push({ pathname: '/login' }));
  };
  return (
    <div className={styles.page}>
      {/* <NavBar mode="light">团卖物联</NavBar> */}
      {/* 数字信息 */}
      <div className={styles.numberInfo}>
        <Flex justify="center">
          <div className="matter">
            <Flex align="end">
              <span className="label">余额</span>
              <span className="value">190,999.66</span>
            </Flex>
            <Flex justify="center">
              <div className="btn" onClick={goLogin}>
                提现
              </div>
              <div className="btn">充值</div>
            </Flex>
          </div>
        </Flex>
      </div>
      {/* 页面内容 */}
      <WingBlank className={styles.content}>
        <div className={styles.box}>
          <div className="title">活动管理</div>
          <div className="inside">
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/1.png')} className="icon" />
              <div className="label">店内领券</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/2.png')} className="icon" />
              <div className="label">下单返券</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/3.png')} className="icon" />
              <div className="label">增值</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/4.png')} className="icon" />
              <div className="label">拼团</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/5.png')} className="icon" />
              <div className="label">满减</div>
            </Flex>
          </div>
        </div>
        <div className={styles.box}>
          <div className="title">活动管理</div>
          <div className="inside">
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/6.png')} className="icon" />
              <div className="label">商圈广告</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/7.png')} className="icon" />
              <div className="label">黄金展位</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/8.png')} className="icon" />
              <div className="label">铂金展位</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/9.png')} className="icon" />
              <div className="label">钻石展位</div>
            </Flex>
          </div>
        </div>
        <div className={styles.box}>
          <div className="title">活动管理</div>
          <div className="inside">
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/10.png')} className="icon" />
              <div className="label">财务统计</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/11.png')} className="icon" />
              <div className="label">提现记录</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/12.png')} className="icon" />
              <div className="label">线下收银</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/13.png')} className="icon" />
              <div className="label">核销记录</div>
            </Flex>
            <Flex direction="column" justify="center">
              <img src={require('../assets/menu/14.png')} className="icon" />
              <div className="label">我的收益</div>
            </Flex>
          </div>
        </div>
      </WingBlank>
      {/* 核销按钮 */}
      <Flex
        onClick={handleVerification}
        className={styles.verification}
        justify="center"
        align="center"
        direction="column"
      >
        <img src={verificationImage} />
        核销
      </Flex>
      {showVerification && verificationPage(handleVerification)}
    </div>
  );
});

/**审核页面 */
function verificationPage(handleVerification: any) {
  return (
    <Flex className={styles.verificationPage} justify="end" direction="column">
      <Flex className="icons">
        <Flex justify="center" direction="column">
          <img src={require('../assets/menu/15.png')} />
          扫码验证
        </Flex>
        <Flex.Item>
          <Flex justify="center" direction="column">
            <img src={require('../assets/menu/16.png')} />
            输码验证
          </Flex>
        </Flex.Item>
        <Flex justify="center" direction="column">
          <img src={require('../assets/menu/17.png')} />
          核销记录
        </Flex>
      </Flex>
      <Flex className="close-icon" align="center" justify="center">
        <Icon type="cross-circle-o" color="rgba(0, 0, 0, 0.2)" onClick={handleVerification} />
      </Flex>
    </Flex>
  );
}
