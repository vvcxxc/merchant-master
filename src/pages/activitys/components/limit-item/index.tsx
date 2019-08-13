import React, { Component } from 'react';
import { Flex, InputItem } from 'antd-mobile';

import styles from './index.less';

interface Props {
	index: number;
	showAdd?: boolean;
	onChange: (index: number, params: Params) => void;
	onClick: (index: number) => void;
}
interface Params {
	min?: any;
	max?: any;
}

/**满多少减多少 项 额度限制组件 */
export default class LimitItem extends Component<Props & Params> {
	handleMinChange = (e: any) => {
		if (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value) || /^[0-9]+\.?$/.test(e.target.value) || e.target.value == "") {
			this.props.onChange(this.props.index, { min: e.target.value, max: this.props.max });
		}
	};
	handleMaxChange = (e: any) => {
		if (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value) || /^[0-9]+\.?$/.test(e.target.value) || e.target.value == "") {
			this.props.onChange(this.props.index, { max: e.target.value, min: this.props.min });
		}

	};
	handleIconClick = () => this.props.onClick(this.props.index);
	render() {
		const icon = (
			<Flex.Item>
				<img
					src={this.props.showAdd ? require('./add-icon.png') : require('./icon.png')}
					alt=""
					onClick={this.handleIconClick}
				/>
			</Flex.Item>
		);
		return (
			<Flex className={styles.limitItem}>
				<span className={styles.sort}>{this.props.index + 1}. </span>
				<span>满</span>
				<input value={this.props.min} onInput={this.handleMinChange} />
				<span>减</span>
				<input value={this.props.max} onInput={this.handleMaxChange} />
				{icon}
			</Flex>
		);
	}
}
