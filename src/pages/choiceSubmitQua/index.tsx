/**
 * title: 选择商户性质
*/
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import request from '@/services/request';
import router from 'umi/router';
import Cookies from 'js-cookie';
import styles from './index.less';

export default class choiceSubmitQua extends Component {
  state = {};
  selsetItem = (type: Number) => {
    //1个人 2企业 3个体工商户 4事业单位
    router.push({ pathname: '/submitQua', query: { dredgeType: type, is_existence: this.props.location.query.is_existence } })
  }
  render() {
    return (
      <div className={styles.choiceSubmitQua}>
        <div className={styles.selectItemBox}>
          <div className={styles.selectTitleBox}>
            <img className={styles.ichoiceIcon} src='http://oss.tdianyi.com/front/Sn8pz7TSXHNjdwmspY6SeRwc3xfbd6sc.png' />
            <div className={styles.titleMsg}>个人类型开通</div>
          </div>
          <div className={styles.selectMsg}>身份证</div>
          <div className={styles.selectMsg}>银行卡</div>
          <div className={styles.gopToDredgeBox} onClick={this.selsetItem.bind(this, 1)} >
            <div className={styles.gopToDredgeBoxText}>快速开通</div>
            <Icon type="right" size='md' />
          </div>
        </div>
        <div className={styles.selectItemBox}>
          <div className={styles.selectTitleBox}>
            <img className={styles.ichoiceIcon} src='http://oss.tdianyi.com/front/3NrDDXDFrGySb5yx3KdFS4jd2Qw4AhKT.png' />
            <div className={styles.titleMsg}>企业类型开通</div>
          </div>
          <div className={styles.selectMsg}>身份证</div>
          <div className={styles.selectMsg}>银行卡</div>
          <div className={styles.selectMsg}>营业执照</div>
          <div className={styles.selectMsg}>银行开户许可证</div>
          <div className={styles.gopToDredgeBox} onClick={this.selsetItem.bind(this, 2)} >
            <div className={styles.gopToDredgeBoxText}>快速开通</div>
            <Icon type="right" size='md' />
          </div>
        </div>
      </div>
    )
  }
}


