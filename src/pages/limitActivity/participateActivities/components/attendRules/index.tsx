import React from 'react'
import styles from './index.less'

declare interface rulesType {
  data:Array<string>
}

export default function AttendRules(data: rulesType) {
  return (
      <div className={styles.attendRules}>
        <div>参与规则</div>
        <ul>
          {
          data.data && data.data.map((item:any,index:number) => {
              return <li key={item}>{index+1}.{item}</li>
            })
          }
        </ul>
      </div>
    )
}