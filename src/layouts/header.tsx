import React, { Component } from 'react';
import { Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';

import { connect } from 'dva';

export default connect(({ ad , businessArea}: any) => ({ad,businessArea}))(
class Header extends Component<any> {
	goBack = () => {
    let url = window.location.href;
    console.log(url)

    // if(url.includes('rechange')){
    //   router.push('/')
    //   return
    // }
	router.goBack()

	// 判断路由广告路由返回时数据清掉
	if(url.includes('ad/other-page')) {
		this.props.dispatch({
			type: 'ad/resetAllData',
		})
	}
	if(url.includes('ad/business-area')) {
		this.props.dispatch({
			type: 'businessArea/resetAllData',
		})
	}
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
})
