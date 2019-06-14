import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import styles from './index.less';

interface Props {
	index: number;
	onChange: (index: number, params: Params) => void;
}
interface Params {
	min?: number;
	max?: number;
}

/**满多少减多少 项 额度限制组件 */
export default class LimitItem extends Component<Props & Params> {
	handleMinChange = (e: any) => {
		this.props.onChange(this.props.index, { min: parseFloat(e.target.value), max: this.props.max });
	};
	handleMaxChange = (e: any) => {
		this.props.onChange(this.props.index, { max: parseFloat(e.target.value), min: this.props.min });
	};
	render() {
		const icon = this.props.index !== 0 && (
			<Flex.Item>
				<img src={require('./icon.png')} alt="" />
			</Flex.Item>
		);
		return (
			<Flex className={styles.limitItem}>
				<span className={styles.sort}>{this.props.index + 1}. </span>
				<span>满</span>
				<input value={this.props.min} type="number" onInput={this.handleMinChange} />
				<span>减</span>
				<input value={this.props.max} type="number" onInput={this.handleMaxChange} />
				{icon}
			</Flex>
		);
	}
}
