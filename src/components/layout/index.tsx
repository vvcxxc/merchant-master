import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';
import UndeterminedModal, { Undetermined, After } from './undeterminedModal';
import SelectDate from './selectDate';

interface Props {
  /**无关紧要的信息 */
  hasInsignificant?: boolean;
  /**快速筛选条件列表 */
  undetermined: Undetermined;
  /**备用筛选条件 */
  after?: After;
  /**条件重置时 */
  hotreset?: () => any;
  timeReset?: () => any;
}

/**筛选列表页组件
 *
 * 筛选条件只包含基础选项和时间筛选
 */
export default class FiltrateLayout extends Component<Props> {
  state = {
    /**查询条件 */
    query: {
      /**热门条件选择 */
      hot: {},
      /**时间月份选择 */
      time: '',
    },
    /**显示条件的下拉列表 */
    hotShow: false,
    /**显示时间筛选的下拉层 */
    timeShow: false,
    /**条件是否已选择 */
    hotCheck: false,
    /**是否选择了时间筛选 */
    timeCheck: false,
  };

  handleHotClick = () => this.setState({ hotShow: !this.state.hotShow, timeShow: false });

  handleTimeClick = () => this.setState({ timeShow: !this.state.timeShow, hotShow: false });

  hotChange = () => this.setState({ hotShow: false });
  timeChange = (value: string): any =>
    this.setState({ query: { ...this.state.query, time: value }, timeShow: false });

  hotReset = () => this.props.hotreset && this.props.hotreset();
  timeReset = () => this.props.timeReset && this.props.timeReset();

  render() {
    const insignificant = this.props.hasInsignificant && (
      <div className={styles.num}>
        <WingBlank>9笔交易</WingBlank>
      </div>
    );
    return (
      <Flex className={styles.wrap} direction="column">
        <div className={styles.filtrate}>
          <WingBlank>
            <Flex align="center">
              <Flex
                align="center"
                onClick={this.handleHotClick}
                className={this.state.hotCheck || this.state.hotShow ? 'checked' : ''}
              >
                <span>筛选</span>
                <img src="" alt="" />
              </Flex>
              <Flex
                align="center"
                onClick={this.handleTimeClick}
                className={this.state.timeCheck || this.state.timeShow ? 'checked' : ''}
              >
                <span>月份</span>
                <img src="" alt="" />
              </Flex>
            </Flex>
          </WingBlank>
        </div>
        {/* 无关紧要的信息 */}
        {insignificant}
        <Flex.Item className={styles.content}>
          <WingBlank>{this.props.children}</WingBlank>
        </Flex.Item>
        <UndeterminedModal
          show={this.state.hotShow}
          onChange={this.hotChange}
          undetermined={this.props.undetermined}
          after={this.props.after}
          reset={this.hotReset}
        />
        <SelectDate
          show={this.state.timeShow}
          reset={this.timeReset}
          value={this.state.query.time}
          onChange={this.timeChange}
        />
      </Flex>
    );
  }
}
