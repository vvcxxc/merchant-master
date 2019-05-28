import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';

interface Props {
  tabs: Array<TabItem>;
  onChange: (arg0: TabItem['id']) => any;
}

interface TabItem {
  id: string | number;
  label: any;
}

export default class TabPage extends Component<Props> {
  state = { active: 0 };
  handleTabChange = (e: any) =>
    this.setState({ active: Number(e.target.getAttribute('data-value')) }, () =>
      this.props.onChange(this.state.active),
    );
  render() {
    const tabItems = this.props.tabs.map(_ => (
      <div
        className={_.id === this.state.active ? 'active tab-item' : 'tab-item'}
        key={_.id}
        data-value={_.id}
        onClick={this.handleTabChange}
      >
        {_.label}
      </div>
    ));
    return (
      <div className={styles.component}>
        <div className="tab">
          <WingBlank>
            <Flex>{tabItems}</Flex>
          </WingBlank>
        </div>
        {this.props.children}
      </div>
    );
  }
}
