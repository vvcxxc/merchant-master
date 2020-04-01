import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile'
const Fail = function (params: any) {
  return (
    <Flex justify="center" align="start" className={styles.fail_box}>
      <div className={styles.fail_prompt}>
        <Flex justify="center"><img src={require('../../../../../assets/tear-up.png')} alt="" /></Flex>
        <Flex justify="center">绑定失败</Flex>
        <Flex justify="center">您的银行卡未验证成功，请检查此银行</Flex>
        <Flex justify="center">卡是否能正常使用</Flex>
        <Flex justify="center" onClick={()=>params.trigger()}>重新绑定</Flex>
      </div>
    </Flex>
  )
}

export default Fail
