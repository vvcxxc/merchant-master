import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default function GroupItem() {
  return (
    <Flex className={styles.groupItem} align="end">
      <img src="" alt="" className="main-img" />
      <Flex.Item className="content">
        <div className="title">
          <span>券的名称</span>
          <span className="sub">3人团</span>
        </div>
        <div className="time">2019.01.04-2019.05.06</div>
        <div className="detail">
          <span>已开团122</span>
          <span>成功拼团100</span>
        </div>
      </Flex.Item>
      <Flex className="btn" justify="center">
        <img src={require('./icon.png')} />
        分享
      </Flex>
    </Flex>
  );
}
