import React, { Component } from 'react'
import styles from './index.less'

interface stateType {
  list: Array<any>,
  
}
export default class InputBox extends Component {
  state = {
    list: [
      
    ],
    activeTime: '',//活动时间
    cardVoucherType: true,//卡券类型
    denomination: '',//卡券面额
    useThreshold: '',//使用门槛
    validTime:'',//有效期
    cardVoucherNumber: '',//卡券数量
  }

  onclange=()=> {
    document.documentElement.scrollTop =0//已知问题，点击输入框之后，再让输入框失去焦点， 就会导致页面整体往上移动，不会还原
  }

  //卡券面额输入
  inputDenomination = (e: any) => {
    this.setState({
      denomination: e.target.value
    })
  }

  //使用门槛输入
  inputUseThreshold = (e: any) => {
    this.setState({
      useThreshold: e.target.value
    })
  }

  //卡券有效期输入
  inputValidTime = (e: any) => {
    this.setState({
      validTime: e.target.value
    })
  }

  //卡券数量输入
  inputCardVoucherNumber = (e:any) => {
    this.setState({
      cardVoucherNumber:e.target.value
    })
  }

  render() {
    const { cardVoucherNumber } = this.state
    return (
      <div className={styles.inputBox}>
        <ul>
          <li>
            <div>活动时间</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            <div>选择卡券类型</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            <div>卡券面额</div>
            <input
              type="number" pattern="[0-9]*"
              value={this.state.denomination}
              onChange={this.inputDenomination}
              onBlur={this.onclange} />
          </li>
          <li>
            <div>使用门槛</div>
            <input
              type="number" pattern="[0-9]*"
              value={this.state.useThreshold}
              onChange={this.inputUseThreshold}
              onBlur={this.onclange} />
          </li>

          <li>
            <div>卡券有效期</div>
            <input
              type="number" pattern="[0-9]*"
              value={this.state.validTime}
              onChange={this.inputValidTime}
              onBlur={this.onclange} />
          </li>

          <li>
            <div>卡券数量</div>
            <input
              type="number" pattern="[0-9]*"
              value={this.state.cardVoucherNumber}
              onChange={this.inputCardVoucherNumber}
              onBlur={this.onclange} />
          </li>

        </ul>

      </div>
    )
  }
}