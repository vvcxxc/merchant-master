import React, {Component} from 'react';
import styles from './index.less';
import {Flex} from 'antd-mobile'
import Item from './item'
export default class ActivityList extends Component {
  state = {
    list: []
  }
  render (){
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

        <div className={styles.issue}>
          <Flex justify='center' align='center' style={{height: '100%'}}>
            <img src={require('@/assets/add.png')}/>
            发布我的卡券
          </Flex>
        </div>
      </div>
    )
  }
}
