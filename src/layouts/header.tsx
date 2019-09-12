import React, { Component } from 'react';
import { Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';

export default class Header extends Component<any> {
	goBack = () => {
		let url = window.location.href;
		console.log(url)

		if(url.includes('rechange')){
		  router.push('/')
		  return
		}
		router.goBack()
	};
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Flex className={styles.header} justify="center">
					<img onClick={this.goBack} src={require('./icon-back@2x.png')} className={styles.backImg} />
					{window.title}
				</Flex>
			</div>
		);
	}
}
