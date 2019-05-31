import React from 'react';
import { Flex } from 'antd-mobile';

export function ItemContent({ title = '', subTitle = '' }: any) {
  return (
    <Flex direction="column" className="item-content">
      <Flex.Item>
        <Flex align="center" className="right-content">
          <Flex.Item>
            <h3>{title}</h3>
            <span>{subTitle}</span>
          </Flex.Item>
          <img src={require('./images/right.png')} alt="" />
        </Flex>
      </Flex.Item>
      <div className="btn">创建必读</div>
    </Flex>
  );
}
