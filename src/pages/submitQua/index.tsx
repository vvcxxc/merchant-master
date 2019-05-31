/**
 * 提交资质
 */
import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, ImagePicker, List, InputItem, Icon } from 'antd-mobile';
import router from 'umi/router';

export default class submitQua extends Component {
  state = {
    /**身份证反面照 */
    id_back: [],
    /**身份证正面照 */
    id_front: [],
    /**手持身份证照 */
    id_hand: [],
    /**有效期 */
    date: '2019-01-01',
    /**银行卡正面照 */
    bank_front: [],
    /**银行卡反面照 */
    bank_back: [],
    /**开户行 */
    bank_name: '招商银行',
    /**营业执照 */
    license_img: [],
    /**营业执照有效期 */
    license_date: '2019-04-22'
  };
  /**查看身份证示例 */
  toIdCardExample = () => {
    router.push('/submitQua/example/idcard')
  }
  /**查看银行卡示例 */
  toBankExample = () => {
    router.push('/submitQua/example/bank')
  }
  /**查看营业执照示例 */
  toLicenseExample = () => {
    router.push('/submitQua/example/license')
  }
  /**跳转到选择日期 */
  toChooseDate = () => {
    router.push({
      pathname: '/submitQua/chooseDate',
      query: {
        id: 1
      }
    })
  }
  render (){
    const { id_hand, id_back, id_front, bank_front, bank_back, license_img } = this.state;
    return (
      <div style={{ width: '100%', height: 'auto', background: '#fff' }}>
        <WingBlank>
          <Flex className={styles.sfz_title}>
            <div className={styles.sfz_left}>身份证</div>
            <div className={styles.sfz_right} onClick={this.toIdCardExample}>查看示例</div>
          </Flex>
          <Flex style={{ marginTop: '23px'}}>请上传经营者身份证</Flex>
          <Flex className={styles.sfz_img}>
            <ImagePicker
              className={styles.front_img}
              files={id_front}
              multiple={false}
              length={1}
              selectable={id_front.length < 1}
            />
            <ImagePicker
              className={styles.back_img}
              files={id_back}
              multiple={false}
              length={1}
              selectable={id_back.length < 1}
            />
            <ImagePicker
              className={styles.hand_img}
              files={id_hand}
              multiple={false}
              length={1}
              selectable={id_hand.length < 1}
            />
          </Flex>
          <List>
            <InputItem placeholder='请输入姓名'>姓名</InputItem>
            <InputItem placeholder='请输入身份证号'>身份证号</InputItem>
            <InputItem placeholder='请选择身份证有效期' editable={false} value={this.state.date} onClick={this.toChooseDate}>有效期<Icon type='right' className={styles.youxiao}/></InputItem>
          </List>
          <Flex className={styles.bank_title}>
            <div className={styles.sfz_left}>银行卡认证</div>
            <div className={styles.sfz_right} onClick={this.toBankExample}>查看示例</div>
          </Flex>
          <Flex className={styles.bank_img}>
          <ImagePicker
              className={styles.bank_front}
              files={bank_front}
              multiple={false}
              length={1}
              selectable={bank_front.length < 1}
          />
          <ImagePicker
            className={styles.bank_front}
            files={bank_back}
            multiple={false}
            length={1}
            selectable={bank_back.length < 1}
          />
          </Flex>
          <List>
            <InputItem placeholder='请输入开户人姓名'>开户人</InputItem>
            <InputItem placeholder='经营者银行卡（仅限储蓄卡）'>银行卡号</InputItem>
            <InputItem placeholder='选择开户银行' editable={false} value={this.state.bank_name}>开户行<Icon type='right' className={styles.youxiao}/></InputItem>
            <InputItem placeholder='请输入支行'>支行</InputItem>
          </List>
          <Flex className={styles.bank_title}>
            <div className={styles.sfz_left}>营业执照</div>
            <div className={styles.sfz_right} onClick={this.toLicenseExample}>查看示例</div>
          </Flex>
          <Flex className={styles.license_img}>
          <ImagePicker
            className={styles.license}
            files={license_img}
            multiple={false}
            length={1}
            selectable={license_img.length < 1}
          />
          </Flex>
          <InputItem placeholder='同统一社会信用代码'>注册号</InputItem>
          <InputItem placeholder='无执照名称可填写经营者名称'>执照名称</InputItem>
          <InputItem placeholder='请输入法人姓名'>法人姓名</InputItem>
          <InputItem placeholder='有效期' editable={false} value={this.state.license_date}  onClick={this.toChooseDate}>有效期<Icon type='right' className={styles.youxiao}/></InputItem>
        </WingBlank>
        <Flex className={styles.buttons}>
          <div className={styles.save}>保存</div>
          <div className={styles.submit}>提交审核</div>
        </Flex>
      </div>
    )
  }
}
