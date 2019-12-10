import React, { Component } from 'react'
import styles from './index.less'

export default class AttendRules extends Component {
  
  state = {
    list: [
      '本次活动仅只有江西省鹰潭区域商家可以参与',
      '活动招募时间截止至2019年10月1日，逾期不候。',
      '商家一旦发布优惠信息，活动期间内不可取消。',
      '商家发布的优惠信息经工作人员审核后方可上线,若出现违规或不合条件的信息，需修改后才可上线',
      '在活动招募时间截止后，商家已发布的优惠活动信息不可修改',
      '本次活动优惠信息均采用奖品形式免费派送给当地真实用户，用户在到店使用后进行核销'
    ]
  }

  render() {
    const { list } = this.state
    return (
      <div className={styles.attendRules}>
        <div>参与规则</div>
        <ul>
          {
            list.map((item:any,index:number) => {
              return <li key={item}>{index+1}.{item}</li>
            })
          }
          
        </ul>
      </div>
    )
  }
}