import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';
import router from 'umi/router';

export default class BankExample extends Component {
  /**返回 */
  goBack = () => {
    router.push('/submitQua')
  }
  render (){
    return (
      <div style={{ width: '100%', background: '#fff' }} className={styles.examplePage}>
        <WingBlank>
           <Flex className={styles.title}>拍照示例：银行卡正面照</Flex>
           <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/fjzbhAb5Y3BEMGfNdG2kkSDKFz622HKK.png'/>
          </Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/2TTyC6e8tAbajt6m4trtnZa4QXHGKTn3.png'/>
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
