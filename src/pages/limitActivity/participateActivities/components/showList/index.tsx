import React from 'react'
import styles from './index.less'

export default function name(params: any) {

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
            <div>{params.list.return_money}{'元'}</div>
          </li>
          <li>
            <div>卡券数量</div>
            <div>{params.list.user_count}{'张'}</div>
          </li>
          <li>
            <div>卡券有效期</div>
            <div>{'领券后'}{params.list.expire_day}{'天有效'}</div>
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
              <div>卡券面额</div>
              <div>{params.list.return_money}{'元'}</div>
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
              <div>{'满'}{params.list.total_fee}{'元可用'}</div>
            </li>
            <li>
              <div>卡券有效期</div>
              <div>{'领券后'}{params.list.expire_day}{'天有效'}</div>
            </li>
            <li>
              <div>卡券数量</div>
              <div>{params.list.user_count}{'张'}</div>
            </li>
          </ul>
      }
      
      </div>
  )
}