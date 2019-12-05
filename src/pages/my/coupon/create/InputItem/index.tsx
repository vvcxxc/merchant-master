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
  restrict?: number //小数点后个数限制
}

export default class CustomInput extends Component<Props> {
  state = {
    value: ''
  }
  componentDidMount() {
    const { value } = this.props
    this.setState({ value: this.props.value })
  }
  handleInput2 = (type: string) => (value: any) => {
    if (value.split(".")[1] == undefined || (value.split(".")[1].length < 3 && value.split(".")[2] == undefined)) {
      this.setState({ value })
    }
    this.props.onChange(value)
  }

  render() {
    const { value } = this.state
    const { placeholder, type, extra, showName, error } = this.props
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
