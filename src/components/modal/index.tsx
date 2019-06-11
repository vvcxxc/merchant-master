import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';

interface Props {
	show: boolean;
	title?: string;
	okBtn?: string;
	cancelBtn?: string;
	onClose: () => any;
	onCancel: () => any;
	onConfirm: () => any;
}

export default class Modal extends Component<Props> {
	handleClickMask = (e: any) => {
		if (e.target.id === 'mask') {
			this.props.onClose();
		}
	};
	render() {
		return (
			<div className={this.props.show ? styles.mask : styles.hideMask} id="mask" onClick={this.handleClickMask}>
				<div className={styles.modal}>
					<Flex className={styles.head + ' flex center'}>
						<Flex.Item>{this.props.title}</Flex.Item>
						<img className={styles.closeIcon} src="" alt="" />
					</Flex>
					<Flex align="center" justify="center" direction="column" className={styles.content}>
						{this.props.children}
					</Flex>
					<Flex className={styles.footer}>
						<Flex.Item className={styles.btn} onClick={this.props.onCancel}>
							{this.props.cancelBtn || '取消'}
						</Flex.Item>
						<Flex.Item className={styles.confirmBtn} onClick={this.props.onConfirm}>
							{this.props.okBtn || '确定'}
						</Flex.Item>
					</Flex>
				</div>
			</div>
		);
	}
}
