import React, { Component } from 'react';
import { InputItem, List, Flex, ImagePicker, Toast } from 'antd-mobile';
import styles from './index.less';

interface Props {
  onChange: (value: any) => void,//改变输入值 触发
  error?: string,
  value: any,
  extra?: string,
  type?: any,
  showName?: string,
  placeholder?: any,
  restrict?: number //小数点后个数限制,
  integer?: number //整数类型（天，张）的位数
}

export default class CustomInput extends Component<Props> {
  state = {
    value: ''
  }
  componentDidMount() {
    // const { value } = this.props
    // this.setState({ value: this.props.value })
  }
  handleInput2 = (type: string) => (value: any) => {
    if (this.props.integer) {
      if (value.length <= this.props.integer) {
        this.setState({ value: parseInt(value) })
      }
      this.props.onChange(value)

    } else {
      if (value.split(".")[1] == undefined || (value.split(".")[1].length < 3 && value.split(".")[2] == undefined)) {
        this.setState({ value })
      }
      this.props.onChange(value)
    }

  }
  // componentWillReceiveProps(next){
  //   console.log(next.value,22)
  //   this.setState({value: next.value})
  // }

  render() {
    // const { value } = this.state
    const { placeholder, type, extra, showName, error,value } = this.props
    return (
      <div>
        <InputItem
          className={styles.customInput}
          type={type ? type : 'text'}
          extra={extra}
          value={
            String(value || '')
          }
          onChange={this.handleInput2('total_num')}
          placeholder={placeholder}
        >
          {showName ? showName : null}
        </InputItem>
        {
          <div className={styles.groub_hint}
            style={{ borderTop: error ? '1px solid red' : '' }}
          >{error ? error : null}</div>

        }
      </div>
    )
  }
}
