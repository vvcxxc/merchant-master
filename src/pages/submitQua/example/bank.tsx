import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';
interface Props {
  onChange: () => any
}
export default class BankExample extends Component<Props> {
  /**返回 */
  goBack = () => {
    this.props.onChange()
  }
  render (){
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }} className={styles.examplePage}>
        <WingBlank>
           <Flex className={styles.title}>拍照示例：银行卡正面照</Flex>
           <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/ztzWWnGZENDdZbHcxShyR4Ktdr7ccK5R.png'/>
          </Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/D26ecKxsHhsCQk4JG8KRNksjxtWmTfXw.png'/>
          </Flex>
           <Flex className={styles.footer}>请保证银行卡各项信息清晰可见，无遮挡</Flex>
           <Button type="primary" style={{ marginTop: 60 }} className={styles.button} onClick={this.goBack}>
            已了解，去上传
          </Button>
        </WingBlank>
      </div>
    )
  }
}
