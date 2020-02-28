import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile'
 const Success = function (params:any) {
   return (
     <Flex justify="center" align="start" className={styles.success_box}>
       <div className={styles.success_prompt}>
         <Flex justify="center"><img src={require('../../../../../assets/checked.png')} alt="" /></Flex>
         <Flex justify="center">成功绑定</Flex>
       </div>
     </Flex>
   )
}
 
export default Success
