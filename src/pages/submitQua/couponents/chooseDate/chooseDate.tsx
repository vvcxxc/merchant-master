/**
 * 选择有效期
 */
import React, { Component } from 'react';
import { WingBlank, Flex, DatePickerView, Button } from 'antd-mobile';
import styles from './index.less'
import moment from 'moment';

export default class chooseDate extends Component {
  state = {
    value: null,
    date: '',
    /**选择日期 */
    is_type1: true,
    /**长期有效 */
    is_type2: false
  }
  changeTime = (v: Date) => {
    let date = moment(v).format("YYYY-MM-DD");
    this.setState({ date: date })
    this.setState({ value: v })
  }
  /**选择日期 */
  chooseDate = () => {
    this.setState({
      is_type1: true,
      is_type2: false
    })
  }
  /**长期有效 */
  chooseLong = () => {
    this.setState({
      is_type1: false,
      is_type2: true
    })
  }

  render (){
    const { is_type1, is_type2 } = this.state;
    const type1 = is_type1 == true ? (
      <div><img src={require('./choose.png')}/></div>
    ) : (
      <div><img src={require('./no_choose.png')}/></div>
    );
    const type2 = is_type2 == true ? (
      <div><img src={require('./choose.png')}/></div>
    ) : (
      <div><img src={require('./no_choose.png')}/></div>
    );
    const picker = is_type1 == true ? (
      <div>
      <Flex className={styles.showtime}>
          <div>{this.state.date}</div>
        </Flex>
      <div className={styles.choose}>
        <DatePickerView mode='date' onChange={this.changeTime} value={this.state.value}/>
      </div>
      </div>
    ) : (
      ''
    )

    return (
      <div style={{ width: '100%', height: '100%', background: '#fff', position: 'fixed', top: '0' }}>
        <WingBlank>
          <Flex className={styles.title}>有效期</Flex>
          <Flex className={styles.type}>
            <Flex className={styles.type1} onClick={this.chooseDate}>
              {type1}
              <div>选择日期</div>
            </Flex>
            <Flex onClick={this.chooseLong}>
              {type2}
              <div>长期有效</div>
            </Flex>
          </Flex>
        </WingBlank>

        {picker}
        <Flex className={styles.buttons}>
          <WingBlank style={{ width: '100%' }}>
            <Button type="primary" className={styles.button}>
              完成
            </Button>
          </WingBlank>
        </Flex>
      </div>

    )
  }
}
