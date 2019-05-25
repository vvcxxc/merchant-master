import React from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile';
import verificationImage from '../assets/varied/verification@2x.png';

export default function() {
  /**核销 */
  const handleVerification = () => {};
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
              <div className="btn">提现</div>
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
      >
        <img src={verificationImage} />
      </Flex>
    </div>
  );
}
