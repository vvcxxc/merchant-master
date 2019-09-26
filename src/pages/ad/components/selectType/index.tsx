import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

import { connect } from 'dva';

interface Props {
	value?: number;
	onChange: (arg0: number) => any;
}

// export default connect(({ ad }: any) => ad)(
export default class SelectAdType extends Component<Props> {
	// list = ['本店', '优惠券', '活动', '链接'];
	list = ['本店', '优惠券'];

	state = {
		value: 0
	};

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value || 0 });
		}
	}

	handleClick = (index: number) => () => {
		this.props.onChange(index)
	};

	render() {
		const labels = this.list.map((_, index) => (
			<div
				className={index == this.state.value ? styles.label + ' ' + styles.activeLabel : styles.label}
				key={_}
				onClick={this.handleClick(index)}
			>
				{
					index === this.state.value && (this.props.adStatus.isPause == 0 && this.props.adStatus.checkStatus == 1) ? (
						<span className={styles.status_normal} ></span>
					)
						: (index === this.state.value && (this.props.adStatus.isPause == 1 && this.props.adStatus.checkStatus == 1)) || (index === this.state.value && (this.props.adStatus.isPause == 0 && this.props.adStatus.checkStatus == 0)) || (index === this.state.value && (this.props.adStatus.isPause == 0 && this.props.adStatus.checkStatus == 2)) || (index === this.state.value && (this.props.adStatus.isPause == 1 && this.props.adStatus.checkStatus == 2)) ? (
							<span className={styles.status_abnormal}></span>
						)
							: ''
				}
				{_}
			</div>
		));
		return (
			<Flex className={styles.selectType}>
				<div className={styles.title}>我想推广</div>
				<Flex.Item>{labels}</Flex.Item>
			</Flex>
		);
	}
}
// )
