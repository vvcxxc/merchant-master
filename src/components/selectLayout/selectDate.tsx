import styles from './index.less';
import React, { useState } from 'react';
import moment from 'moment';
import { WingBlank, Flex, DatePickerView } from 'antd-mobile';

interface Props {
  show: boolean;
  value: string;
  end_time: string;
  timeSelect?: any;
  endTimeSelect?: any;
  onHide: () => any;
  onChange: (arg0: string | undefined, arg1: string | undefined) => any;
}

export default function SelectDate({ show, value, onChange, onHide, end_time, timeSelect, endTimeSelect }: Props) {
  const [date, setDate] = useState(timeSelect ? moment(timeSelect).toDate() : moment(value || undefined).toDate()); // 开始时间
  const [end_date, setEndDate] = useState(endTimeSelect ? moment(endTimeSelect).toDate() : moment(end_time || undefined).toDate()); //结束时间
  const [max_date, setMaxDate] = useState(); // 设置最小时间
  const [min_date, setMinDate] = useState() // 设置最大时间
  const [idx, setIdx] = useState(1)
  const submit = () => onChange(moment(date).format('YYYY-MM-DD'), moment(end_date).format('YYYY-MM-DD'));
  const reset = () => {
    setDate(new Date());
    setEndDate(new Date())
    onChange(undefined, undefined);
  };
  const handleDateChange = (value: Date) => {
    if (idx === 1) {
      setDate(value);
      setEndDate(value);
    } else {
      setEndDate(value);
    }
  };
  /**父级点击事件 */
  const maskClick = (e: any) => {
    if (e.target.id === 'layoutModal') {
      setDate(moment(value || undefined).toDate());
      setEndDate(moment(end_time || undefined).toDate());
      // setEndDate()
      onHide();
      // onChange(value);
    }
  };

  const selectDate = (a: any) => {
    setIdx(a)
    if (a == 2) {
      let minDate = date
      let maxDate = moment(date).add(30, 'days')._d
      // console.log(minDate)
      setMinDate(minDate)
      setMaxDate(maxDate)
    } else {
      setMinDate('')
      setMaxDate('')
    }
  }


  return show ? (
    <div className={styles.layoutModal} id="layoutModal" onClick={maskClick}>
      <div className="content">
        <WingBlank>
          <div className={styles.time_title}>请选择时间</div>
          <Flex direction="column" className={styles.dateModal}>
            {/* <Flex className="date-show" justify="center">
							{moment(date).format('YYYY-MM')}
						</Flex> */}
            <Flex justify="center" className="date-show">
              <div className={idx == 1 ? 'time' : 'time_no'} onClick={selectDate.bind(this, 1)}>{moment(date).format('YYYY-MM-DD')}</div>
              <div style={{ padding: '0 .72rem', fontSize: '.24rem' }}>至</div>
              <div className={idx == 2 ? 'time' : 'time_no'} onClick={selectDate.bind(this, 2)}>{moment(end_date).format('YYYY-MM-DD')}</div>
            </Flex>
            <Flex.Item style={{ width: '100%' }}>
              <DatePickerView
                value={idx === 1 ? date : end_date}
                mode="date"
                onChange={handleDateChange}
                minDate={min_date ? min_date : new Date(2000, 1, 1, 0, 0, 0)}
                maxDate={max_date ? max_date : new Date(2030, 1, 1, 23, 59, 59)}
              />
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>

      <Flex style={{ backgroundColor: '#fff', height: '1.3rem' }}>
        <Flex.Item className="btn" onClick={reset}>
          重置
				</Flex.Item>
        <Flex.Item className="btn" onClick={submit}>
          确认
				</Flex.Item>
      </Flex>
    </div>
  ) : null;
}
