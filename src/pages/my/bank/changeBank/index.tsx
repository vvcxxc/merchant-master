import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, List, InputItem, ImagePicker, Button } from 'antd-mobile';

export default class ChangeBank extends Component {
  state = {

  };
  render (){
    return (
      <div style={{width: '100%', height: '100%', background: '#fff'}}>
        <WingBlank>
          <Flex className={styles.title}>银行卡认证</Flex>
          <Flex className={styles.bank_img}>
            <ImagePicker
              className={styles.bank_front}
              multiple={false}
              length={1}
            />
            <ImagePicker
              className={styles.bank_back}
              multiple={false}
              length={1}
            />
          </Flex>
          <List className={styles.input_box}>
            <InputItem placeholder='请输入开户人姓名'>开户人</InputItem>
            <InputItem placeholder='经营者银行卡（仅限储蓄卡）'>银行卡号</InputItem>
            <InputItem placeholder='请选择开户银行'>开户银行</InputItem>
            <InputItem placeholder='请输入验证码'>验证码</InputItem>
            <InputItem placeholder='请输入支行地址'>支行</InputItem>
          </List>
          <Button type="primary" style={{ marginTop: 115 }} className={styles.button}>
            确认更新
          </Button>
        </WingBlank>
      </div>
    )
  }
}
