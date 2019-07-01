import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';

interface Props {
  onChange: () => any
}

export default class LicenseExample extends Component<Props> {
  /**返回 */
  goBack = () => {
    this.props.onChange()
  }
  render (){
    return (
      <div style={{ width: '100%', background: '#fff' }} className={styles.examplePage}>
        <WingBlank>
           <Flex className={styles.title}>拍照示例：营业执照</Flex>
           <img src="http://oss.tdianyi.com/front/a7DA2ftyfnzhMGMsTeQ5kJfNc4WRHfwm.png" style={{width: '100%'}}/>
           <Flex className={styles.footer}>1、请上传营业执照原件照片 </Flex>
           <Flex className={styles.footer}>2、需文字清晰、完整，露出国徽及印章 </Flex>
           <Flex className={styles.footer}>3、不可使用其他证件替代，包括食品安全证明等 </Flex>
           <Button type="primary" style={{ marginTop: 60 }} className={styles.button} onClick={this.goBack}>
            已了解，去上传
          </Button>
        </WingBlank>
      </div>
    )
  }
}
