import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

interface Props {
	title: string;
	isNoDate?: boolean;
}

export default class Box extends Component<Props> {
	render() {
		return (
			<div className={styles.box}>
				<div className="title">{this.props.title}</div>
				<Flex className="box-content" justify="center">
					{this.props.isNoDate ? <span className="tip">暂无数据</span> : this.props.children}
				</Flex>
			</div>
		);
	}
}
