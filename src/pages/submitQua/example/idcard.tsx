import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';
import router from 'umi/router';

export default class IdCardExample extends Component {
  /**返回 */
  goBack = () => {
    router.push('/submitQua')
  }
  render (){
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        <WingBlank>
           <Flex className={styles.title}>拍照示例：身份证正面照</Flex>
           {/* <Flex className={styles.bg}></Flex> */}
           <Flex className={styles.footer}>请保证身份证各项信息清晰可见，无遮挡</Flex>
           <Button type="primary" style={{ marginTop: 60 }} className={styles.button} onClick={this.goBack}>
            已了解，去上传
          </Button>
        </WingBlank>
      </div>
    )
  }
}
