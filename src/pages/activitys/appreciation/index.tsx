import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import GroupItem from './item';

export default class Group extends Component {
  handleChange = (id: any) => {};
  render() {
    const tabs = [
      { id: 0, label: '进行中' },
      { id: 1, label: '待生效' },
      { id: 2, label: '已结束' },
    ];
    return (
      <TabPage tabs={tabs} onChange={this.handleChange}>
        <Flex direction="column" style={{ height: '100%' }}>
          <Flex.Item className={styles.pageContent}>
            <WingBlank>
              <GroupItem />
            </WingBlank>
          </Flex.Item>
          <div className="add-icon">+</div>
        </Flex>
      </TabPage>
    );
  }
}
