import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import styles from './index.less';

interface Props {
	onClick: () => void;
}

export default class AddButton extends Component<Props> {
	render() {
		return (
			<Flex align="center" direction="column" className={styles.addButton} onClick={this.props.onClick}>
				<img src={require('./icon.png')} />
				<span>添加活动</span>
			</Flex>
		);
	}
}
