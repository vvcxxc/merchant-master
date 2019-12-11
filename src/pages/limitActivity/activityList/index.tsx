import React, {Component} from 'react';
import styles from './index.less';
import {Flex} from 'antd-mobile'
import Item from './item'
export default class ActivityList extends Component {
  state = {
    list: [],
    num: 0, // 优惠券的数量
    max_num: 0, // 最大优惠券数
    is_model: false, // 显示弹框
  }

  // 发布活动
  issue = () => {
    const {num, max_num} = this.state
    if (num >= max_num){
      this.setState({is_model: true})
    }else{

    }
  }


  render (){
    const Model = (
      <div className={styles.model}>
        <div className={styles.model_main}>
          <div className={styles.model_title}>温馨提示</div>
          <div className={styles.model_text}>本次活动，每个商家最多可发布10张卡券</div>
          <div className={styles.model_bottom} onClick={()=>this.setState({is_model: false})}>确定</div>
        </div>
      </div>
    )
    const {is_model} = this.state
    return (
      <div className={styles.listPage}>

        {
          this.state.list.length ? (
            <div>
              <Flex className={styles.hint}>
                *温馨提示：本次活动只能发布X张卡券，若需要发布其他卡券，请删除本来的卡券后再添加。
              </Flex>
              <div className={styles.list}>
                <Item />
              </div>
            </div>
          ) : (
            <div className={styles.no_data}>
              <div className={styles.no_data_main}>
                <img src={require('@/assets/no-coupon.png')}/>
                <div>您还未发布卡券，赶紧添加吧!</div>
              </div>
            </div>
          )
        }
        {is_model ? Model : null}
        <div className={styles.issue} onClick={this.issue}>
          <Flex justify='center' align='center' style={{height: '100%'}}>
            <img src={require('@/assets/add.png')}/>
            发布我的卡券
          </Flex>
        </div>
      </div>
    )
  }
}
