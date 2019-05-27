import styles from './index.less';
import React, { useState } from 'react';
import moment from 'moment';
import { WingBlank, Flex, DatePickerView } from 'antd-mobile';

interface Props {
  reset: () => any;
  show: boolean;
  value: string;
  onChange: (arg0: string) => string;
}

export default function SelectDate({ reset, show, value, onChange }: Props) {
  const [date, setDate] = useState(moment(value || undefined).toDate());
  const submit = () => onChange(moment(date).format('YYYY-MM'));
  const _reset = () => {
    reset();
  };
  const handleDateChange = (value: Date) => {
    setDate(value);
  };

  /**父级点击事件 */
  const maskClick = (e: any) => {
    if (e.target.id === 'layoutModal') {
      setDate(moment(value || undefined).toDate());
      onChange(value);
    }
  };
  return show ? (
    <div className={styles.layoutModal} id="layoutModal" onClick={maskClick}>
      <div className="content">
        <WingBlank>
          <Flex direction="column" className={styles.dateModal}>
            <Flex className="date-show" justify="center">
              {moment(date).format('YYYY-MM')}
            </Flex>
            <Flex.Item style={{ width: '100%' }}>
              <DatePickerView value={date} mode="month" onChange={handleDateChange} />
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>

      <Flex style={{ backgroundColor: '#fff' }}>
        <Flex.Item className="btn" onClick={_reset}>
          重置
        </Flex.Item>
        <Flex.Item className="btn" onClick={submit}>
          确认
        </Flex.Item>
      </Flex>
    </div>
  ) : null;
}
