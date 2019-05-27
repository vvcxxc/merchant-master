import React from 'react';
import styles from './index.less';
import GlobalTabbar from './tabbar';

const BasicLayout: React.FC = props => {
  return <GlobalTabbar>{props.children}</GlobalTabbar>;
};

export default BasicLayout;
