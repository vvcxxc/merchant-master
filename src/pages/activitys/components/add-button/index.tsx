import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import styles from './index.less';

export default class AddButton extends Component {
	render() {
		return (
			<Flex align="center" direction="column" className={styles.addButton}>
				<img src="" />
				<span>添加活动</span>
			</Flex>
		);
	}
}
