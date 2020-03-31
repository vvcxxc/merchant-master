/**
 * 选择有效期
 */
import React, { Component } from 'react';
import { WingBlank, Flex, DatePickerView, Button } from 'antd-mobile';
import styles from './index.less'
import moment from 'moment';
import { connect } from 'dva';
import router from 'umi/router';
import Cookies from 'js-cookie';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class chooseDate extends Component<any> {
  state = {
    value: now,
    date: '',
    /**选择日期 */
    is_type1: true,
    /**长期有效 */
    is_type2: false,
    /**
     * 判断是哪一个选择的 
     * type == 1  身份证
     * type == 2  营业执照
     * */
    type: 0,
  }

  componentDidMount() {
    let type = this.props.location.query.type;
    let DoubleDryIDCardValidity = Cookies.get("DoubleDryIDCardValidity");
    let SaleValidity = Cookies.get("SaleValidity");
    if (type == 1 && DoubleDryIDCardValidity) {
      if (DoubleDryIDCardValidity.includes("长期")) {
        this.setState({
          is_type1: false,
          is_type2: true,
          type,
          date: '长期'
        })
      } else {
        this.setState({
          is_type1: true,
          is_type2: false,
          type,
          date: JSON.parse(Cookies.get("DoubleDryIDCardValidity")),
          value: new Date(moment(Cookies.get("DoubleDryIDCardValidity")).toString())
        })
      }
    } else if (type == 2 && SaleValidity) {
      if (SaleValidity.includes("长期")) {
        this.setState({
          is_type1: false,
          is_type2: true,
          type,
          date: '长期'
        })
      } else {
        this.setState({
          is_type1: true,
          is_type2: false,
          type,
          date: JSON.parse(Cookies.get("SaleValidity")),
          value: new Date(moment(Cookies.get("SaleValidity")).toString())
        })
      }
    } else {
      this.setState({
        value: now,
        date: moment(now).format("YYYY-MM-DD"),
        type
      })
    }

  }


  changeTime = (v: Date) => {
    let date = moment(v).format("YYYY-MM-DD");
    this.setState({ date: date })
    this.setState({ value: v })
  }
  /**选择日期 */
  chooseDate = () => {
    const { type } = this.state;
    if (type == 1) {
      this.setState({
        is_type1: true,
        is_type2: false,
        date: Cookies.get("DoubleDryIDCardValidity") && !Cookies.get("DoubleDryIDCardValidity").includes("长期") ? JSON.parse(Cookies.get("DoubleDryIDCardValidity")) : moment(now).format("YYYY-MM-DD"),
        value: Cookies.get("DoubleDryIDCardValidity") && !Cookies.get("DoubleDryIDCardValidity").includes("长期") ? new Date(moment(Cookies.get("DoubleDryIDCardValidity")).toString()) : now
      })
    }else if(type == 2) {
      this.setState({
        is_type1: true,
        is_type2: false,
        date: Cookies.get("SaleValidity") && !Cookies.get("SaleValidity").includes("长期") ? JSON.parse(Cookies.get("SaleValidity")) : moment(now).format("YYYY-MM-DD"),
        value: Cookies.get("SaleValidity") && !Cookies.get("SaleValidity").includes("长期") ? new Date(moment(Cookies.get("SaleValidity")).toString()) : now
      })
    }
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
    console.log(this.state);
    const { type, date } = this.state;
    if (type == 1) {
      Cookies.set("DoubleDryIDCardValidity", JSON.stringify(date), { expires: 1 });
    } else {
      Cookies.set("SaleValidity", JSON.stringify(date), { expires: 1 });
    }
    router.goBack();
  }


  render() {
    const { is_type1, is_type2 } = this.state;
    const type1 = is_type1 == true ? (
      <div><img src={require('./choose.png')} /></div>
    ) : (
        <div><img src={require('./no_choose.png')} /></div>
      );
    const type2 = is_type2 == true ? (
      <div><img src={require('./choose.png')} /></div>
    ) : (
        <div><img src={require('./no_choose.png')} /></div>
      );
    const picker = is_type1 == true ? (
      <div>
        <Flex className={styles.showtime}>
          <div>{this.state.date}</div>
        </Flex>
        <div className={styles.choose}>
          <DatePickerView mode='date' onChange={this.changeTime} value={this.state.value} maxDate={new Date(2050, 1, 1)} />
        </div>
      </div>
    ) : (
        ''
      )

    return (
      <div style={{ width: '100%', height: '100%', background: '#fff', }}>
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

