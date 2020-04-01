import React, { useState, useEffect } from 'react';
import styles from './index.less'
import { Flex, PickerView } from 'antd-mobile'
interface Props {
  type: number; // 0 选择配送范围， 1 选择配送时间
  start_time?: string; // 配送开始时间
  end_time?: string; // 配送结束时间
  mater?: string; // 配送距离
  onChange: (data: any)=> any
}
export default function SelectBox(props: Props) {
  const [start_time, setStart] = useState('00：00')
  const [end_time, setEnd] = useState('00：00')
  const [mater, setMater] = useState('1.0km')
  const [endTime, setEndTime] = useState([])
  let season: any = []
  for (let i = 1; i <= 20; i++) {
    season.push({ label: i + '.0km', value: i + '.0km' })
  }
  let time: any = []
  for (let i = 0; i <= 23; i++) {
    // if (i < 10) {
    //   time.push({ label: '0' + i + '：00', value: '0' + i + '：00' })
    // } else {
      time.push({ label: i + '：00', value: i + '：00' })
    // }
  }

  useEffect(() => {
    if (props.type) {
      setStart(props.start_time || '')
      setEnd(props.end_time || '')
    } else {
      setMater(props.mater || '')
    }
  }, [])

  // 每次改变start_time时，修改end_time 的范围
  useEffect(() => {
    let time = start_time.split('：')[0]
    let endTime = []
    if (Number(time)) {
      for (let i = Number(time); i < 24; i++) {
        // if (i < 10) {
        //   endTime.push({ label: '0' + i + '：00', value: '0' + i + '：00' })
        // } else {
          endTime.push({ label: i + '：00', value: i + '：00' })
        // }
      }
    } else {
      for (let i = 0; i <= 23; i++) {
        // if (i < 10) {
        //   endTime.push({ label: '0' + i + '：00', value: '0' + i + '：00' })
        // } else {
          endTime.push({ label: i + '：00', value: i + '：00' })
        // }
      }
    }

    setEndTime(endTime)
  }, [start_time])

  const onChange = (type: string) => (value: string) => {
    if (type == 'start_time') {
      setStart(value[0])
    } else if (type == 'end_time') {
      setEnd(value[0])
    } else if (type == 'mater') {
      setMater(value[0])
    }
  }

  const onConfirm = () => {
      if (props.type){
        props.onChange({start_time, end_time})
      }else {
        props.onChange({mater})
      }
  }

  const handleClose = () => {
    props.onChange({})
  }



  return (
    <div className={styles.select_box_page}>
      <div className={styles.select_box}>
        <div className={styles.select_title}>

          {props.type ? '配送时间段' : '配送距离'}
          <img src={require('@/assets/error_two.png')} className={styles.close} onClick={handleClose}/>
        </div>
        <div className={styles.select_main_box}>
          {
            props.type ? (
              <div className={styles.select_main}>
                <div className={styles.picker_box}>
                  <PickerView
                    data={time}
                    onChange={onChange('start_time')}
                    value={[start_time]}
                    itemStyle={{ height: '.98rem', lineHeight: '.98rem', }}
                    indicatorStyle={{ height: '.98rem', fontSize: 34, lineHeight: '.98rem', borderTop: '1px solid #98A6AD', borderBottom: '1px solid #98A6AD' }}
                    cascade={false}
                  />
                </div>
                <div className={styles.gang}>—</div>
                <div className={styles.picker_box}>
                  <PickerView
                    data={endTime}
                    value={[end_time]}
                    onChange={onChange('end_time')}
                    itemStyle={{ height: '.98rem', lineHeight: '.98rem', }}
                    indicatorStyle={{ height: '.98rem', fontSize: 34, lineHeight: '.98rem', borderTop: '1px solid #98A6AD', borderBottom: '1px solid #98A6AD' }}
                    cascade={false}
                  />
                </div>
              </div>
            ) : (
                <div className={styles.select_main}>
                  <div className={styles.picker_mater_box}>
                    <PickerView
                      data={season}
                      onChange={onChange('mater')}
                      value={[mater]}
                      itemStyle={{ height: '.98rem', lineHeight: '.98rem', }}
                      indicatorStyle={{ height: '.98rem', fontSize: 34, lineHeight: '.98rem', borderTop: '1px solid #98A6AD', borderBottom: '1px solid #98A6AD' }}
                      cascade={false}
                    />
                  </div>
                </div>
              )
          }

        </div>
        <div className={styles.button_box} onClick={onConfirm}>
          确定
        </div>
      </div>
    </div>
  )
}
