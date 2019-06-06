/**
 * 选择有效期
 */
import React, { Component } from 'react';
import { WingBlank, Flex, DatePickerView, Button } from 'antd-mobile';
import styles from './index.less'
import moment from 'moment';

interface Props {
  onChange: (type: number, date: string) => any;
  choose_date: string ;
  type: number;
}

export default class chooseDate extends Component<Props> {
  state = {
    value: null,
    date: '',
    /**选择日期 */
    is_type1: true,
    /**长期有效 */
    is_type2: false,
    /**判断是哪一个选择的 */
    type: 1,

  }

  componentDidMount(){
    const {type, choose_date} = this.props;
    let is_have = choose_date.includes('长')
    if(is_have){
      this.setState({is_type1: false, is_type2: true})
    }else{
      let value = moment(choose_date).toDate();
      this.setState({value, date: choose_date})
    }
    this.setState({
      type,
      date: choose_date
    });
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
      is_type2: true,
      date: '长期'
    })
  }
  /**点击完成 */
  submit = () => {
    const {type, date} = this.state;
    this.props.onChange(type,date)
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
        <DatePickerView mode='date' onChange={this.changeTime} value={this.state.value} maxDate={new Date(2050,1,1)}/>
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
            <Button type="primary" className={styles.button} onClick={this.submit}>
              完成
            </Button>
          </WingBlank>
        </Flex>
      </div>

    )
  }
}
