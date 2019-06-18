/**
 * title： 图片要求
 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast } from 'antd-mobile';
import styles from './index.less';

interface Props {
  onChange: () => any
}

export default class Example extends Component<Props> {

  goBack = () => {
    this.props.onChange()
  }
  render (){
    return (
      <div className={styles.example_box}>
        <WingBlank>
          <Flex className={styles.header}>拍照示例：门头照</Flex>
          <Flex><img src={require('./example.png')}/></Flex>
          <Flex className={styles.tips}>请保留门店招牌清晰无遮挡</Flex>
          <Button type="primary" style={{ marginTop: 60 }} className={styles.button} onClick={this.goBack}>
            已了解，去上传
          </Button>
        </WingBlank>
      </div>

    )
  }
}
