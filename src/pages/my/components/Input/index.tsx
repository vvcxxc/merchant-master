import React, { Component } from 'react';
import styles from './index.less';
import { Icon } from 'antd-mobile';

interface Props {
  type: string,                  //想要什么类型的输入框
  placeholder?: string,           //默认提示什么
  value?: string | number,        // 用户输入的数据
  onDelete: () => void,           //用户点击删除函数 会删除输入框里面的数据
  onChange: (value: any) => void, //输入框输入触发
  mb?: number,                     //底部外边距
  prompt?:number|string            //输入框信息提示
}

export default class MyInput extends Component<Props>{
  state = {
    inpText: '',
    inpPassword:''
  }

  handelChange = (e: any) => {
    this.props.onChange(e.target.value.trim())
    this.setState({
      inpText: e.target.value.trim()
    }, )
  }

  onDelete = (e:any) => {
    this.props.onDelete()
    this.setState({
      inpText:''
    })
  }

  render() {
    const { inpText } = this.state
    const { type, placeholder, value, mb, prompt} = this.props
    return (
      <div className={styles.inputBox_text} style={{
        marginBottom: mb ? mb+'px':'0px'
      }}>
        <input
          type={type ? type : 'text'}
          placeholder={placeholder ? placeholder : "请输入账号"}
          value={this.state.inpText}
          onChange={this.handelChange.bind(this)}
          onBlur={() => window.scrollTo(0, 0)}
          dir="rtl"
        />
        {
          inpText.length > 0 ? <div className={styles.icon} onClick={this.onDelete.bind(this)}>
            <Icon type="cross-circle" />
          </div>:null
        }
        {
          prompt ? <div className={styles.error_message}>{prompt}</div>:null
        }

      </div>
    )
  }
}
