import { DatePickerView, Flex } from 'antd-mobile';
import React from 'react';
import FiltrateLayout from '@/components/layout';

export default function page() {
  let list = [];
  for (let i = 0; i < 15; i++) {
    list.push(<div style={{ width: '100%', height: 160 }}>11111</div>);
  }
  return (
    <FiltrateLayout undetermined={[]}>{list}</FiltrateLayout>
    // <div>

    // </div>
  );
}
