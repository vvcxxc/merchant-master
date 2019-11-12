import React, { Component } from 'react';
import { Flex, InputItem } from 'antd-mobile';

import styles from './index.less';

interface Props {
	index: number;
	showAdd?: boolean;
	isError?: boolean;
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
			<div >
				<Flex className={styles.limitItem} style={{ borderBottom: this.props.isError ? '1px #d2284b solid' : 'none' }}>
					<span className={styles.sort}>{this.props.index + 1}. </span>
					<span>满</span>
					<input value={this.props.min} onInput={this.handleMinChange} />
					<span>减</span>
					<input value={this.props.max} onInput={this.handleMaxChange} />
					{icon}
				</Flex>
				{
					this.props.isError && (Number(this.props.min) == 0 || Number(this.props.max) == 0) ? <div className={styles.errorLine} >满减活动的金额设置必须大于0元</div> : null
				}
				{
					this.props.isError && (!this.props.min || !this.props.max) ? <div className={styles.errorLine} >请设置满减条件</div> : null
				}
				{
					this.props.isError && Number(this.props.min) < Number(this.props.max) ? <div className={styles.errorLine} >满减条件设置规则有误，请重新设置</div> : null
				}
			</div>
		);
	}
}
