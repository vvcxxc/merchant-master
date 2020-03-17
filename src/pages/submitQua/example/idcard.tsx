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
      <div style={{ width: '100%', background: '#fff', overflow: 'auto' }} className={styles.examplePage}>
        <WingBlank>
          <Flex className={styles.title}>拍照示例：身份证正面照，反面照，手持身份证照</Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/4SAHTGFApSScrsHQ8TFbzeKweAZ3c3zb.png'/>
          </Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/HBwmNamwMpXNiHEAnxnwhDx5PMR7DS2Z.png'/>
          </Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/8rCmTiRQdxNKKfEmjKCNcS3ZQGAdNz46.png'/>
          </Flex>
          <Flex className={styles.footer} style={{marginTop: 36}}>请保证身份证各项信息清晰可见，无遮挡</Flex>
          <Button type="primary" style={{ marginTop: 60, marginBottom: 40 }} className={styles.button} onClick={this.goBack}>
            我已了解，去上传
          </Button>
        </WingBlank>
      </div>
    )
  }
}
