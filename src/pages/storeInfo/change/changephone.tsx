import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button  } from 'antd-mobile';

export default class ChangePhone extends Component {
  state = {
    steps: true,
    /**旧手机号 */
    old_phone: '',
    /**第一步验证码 */
    code1: '',
    /**新手机号 */
    new_phone: '',
    /**第二部验证码 */
    code2: ''
  };
  handleCode1 = (e : any) => {
    this.setState({code1: e.target.value})
  }
  handleNew = (e : any) => {
    this.setState({new_phone: e.target.value})
  }
  handleCode2 = (e : any) => {
    this.setState({code2: e.target.value})
  }
  /**下一步 */
  confirm1 = () => {
    this.setState({steps: false})
  }


  render (){
    const step1 = this.state.steps == true ? (
      <div>
        <Flex className={styles.header}>
          <Flex className={styles.actives}>
            <div className={styles.num}>1</div>验证身份
          </Flex>
          <Flex className={styles.no_actives}>
            <div className={styles.num}>2</div>验证新手机
          </Flex>
        </Flex>
        <Flex className={styles.inputRow}>
          当前手机号：13012312312
        </Flex>
        <Flex className={styles.inputRow}>
          <input type="text" placeholder="请输入验证码" value={this.state.code1} onChange={this.handleCode1}/>
          <div className={styles.code}>获取验证码</div>
        </Flex>
        <WingBlank className={styles.buttons}>
          <Button type="primary" style={{ marginTop: 86 }} onClick={this.confirm1}>
            下一步
          </Button>
        </WingBlank>
      </div>
    ) : (
      <div>
          <Flex className={styles.header}>
            <Flex className={styles.no_actives}>
              <div className={styles.num}>1</div>验证身份
            </Flex>
            <Flex className={styles.actives}>
              <div className={styles.num}>2</div>验证新手机
            </Flex>
          </Flex>
          <Flex className={styles.inputRow}>
           <input type="text" placeholder="请输入新手机号" value={this.state.new_phone} onChange={this.handleNew}/>
          </Flex>
          <Flex className={styles.inputRow}>
            <input type="text" placeholder="请输入验证码" value={this.state.code2} onChange={this.handleCode2}/>
            <div className={styles.code}>获取验证码</div>
          </Flex>
          <WingBlank className={styles.buttons}>
            <Button type="primary" style={{ marginTop: 86 }}>
              确认修改
            </Button>
          </WingBlank>
        </div>
    )
    return (
      <div style={{width: '100%', height: '100%', background: '#fff'}}>
        {step1}
      </div>
    )
  }
}
