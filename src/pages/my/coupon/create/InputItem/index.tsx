import React, { Component } from 'react';
import { InputItem, List, Flex, ImagePicker, Toast } from 'antd-mobile';
import styles from './index.less';

interface Props {
  onChange: (value:any) => void,//改变输入值 触发
  error?: string,
  value: any,
  extra?: string,
  type?: any,
  showName?: string,
  placeholder?:any
}
// "number" | "text" | "money" | "bankCard" | "phone" | "password" | "digit" | undefined”

export default class CustomInput extends Component<Props> {
  state = {
    value:''
  }
  handleInput2=(type: string) => (value: any) => {
    console.log(type,value,'value');
    this.setState({ value: value })
    this.props.onChange(value)
}

  render() {
    const { value } = this.state
    const { placeholder, type, extra, showName, error}= this.props
    return (
      <div>
        <InputItem
          className={styles.customInput}
          type={type ? type : 'text'}
          extra={extra}
          value={String(value || '')}
          onChange={this.handleInput2('total_num')}
          placeholder={placeholder}
        >
          { showName ? showName : null }
        </InputItem>
        {
          error ?
            <div className={styles.groub_hint}>{error}</div> : null
        }
     </div>
    )
  }
}