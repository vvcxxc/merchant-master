import React from 'react'
import styles from './index.less'

export default function name(params: any) {
  console.log(params,'jkjkjkj');
  
  return (
    <div className={styles.inputBox_two}>
      {
        !params.list.youhui_type ? <ul>
          <li style={{ border: 'none', color: '#000000', paddingTop: '0.3rem',paddingBottom:'0rem' }}>卡券信息</li>
          <li>
            <div>卡券名称</div>
            <div>{params.list.name}</div>
          </li>
          <li>
            <div>发布时间</div>
            <div>{params.list.begin_time}</div>
          </li>
          <li>
            <div>卡券类型</div>
            <div>{{ [0]: '兑换券', [1]: '现金券' }[params.list.youhui_type]}</div>
          </li>
          <li className={styles.activeImg} >
            <div>活动图片</div>
            <div>
              <img src={'http://oss.tdianyi.com/'+params.list.image} alt=""/>
            </div>
          </li>
          <li>
            <div>商品原价</div>
            <div>{params.list.return_money}</div>
          </li>
          <li>
            <div>卡券数量</div>
            <div>{params.list.total_num}</div>
          </li>
          <li>
            <div>卡券有效期</div>
            <div>{params.list.expire_day}</div>
          </li>
          <li >
            <div>使用须知</div>
            <div className={styles.useInfo}>
              {
                params.list.description && params.list.description.map((item: string, index: number) => {
                  return <div key={item}>{index + 1}.{item}</div>
                })
              }
            </div>
          </li>
        </ul> : <ul>
            <li style={{ border: 'none', color: '#000000', paddingTop: '0.3rem', paddingBottom: '0rem' }}>
              卡券信息</li>
            <li>
              <div>卡券名称</div>
              <div>{params.list.name}</div>
            </li>
            <li>
              <div>发布时间</div>
              <div>{params.list.begin_time}</div>
            </li>
            <li>
              <div>卡券类型</div>
              <div>{{ [0]: '兑换券', [1]: '现金券' }[params.list.youhui_type]}</div>
            </li>
            <li>
              <div>使用门槛</div>
              <div>{params.list.total_fee}</div>
            </li>
            <li>
              <div>卡券有效期</div>
              <div>{params.list.expire_day}</div>
            </li>
            <li>
              <div>卡券数量</div>
              <div>{params.list.total_num}</div>
            </li>
          </ul>
      }
      
      </div>
  )
}