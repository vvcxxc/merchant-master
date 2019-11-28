import React, { Component } from 'react';
import { Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';

import { connect } from 'dva';

export default connect(({ ad, businessArea }: any) => ({ ad, businessArea }))(
	class Header extends Component<any> {
		state = {
			showNav: true
		}
		goBack = () => {
			let url = window.location.href;
			// if(url.includes('rechange')){
			//   router.push('/')
			//   return
			// }
			router.goBack()

			// 判断路由广告路由返回时数据清掉
			if (url.includes('ad/other-page')) {
				this.props.dispatch({
					type: 'ad/resetAllData',
				})
			}
			if (url.includes('ad/business-area')) {
				this.props.dispatch({
					type: 'businessArea/resetAllData',
				})
			}
		};
		componentWillMount() {
			console.log(this.props)
			console.log('window', window.title)
			if (window.location.href.includes('serviceCounter')
				|| window.location.href.includes('register?phone=')
				|| window.location.href.includes('dynamicFunds')
				|| window.location.href.includes('AdvertisingSpending')
				|| window.location.href.includes('loudspeaker')
				|| window.location.href.includes('finance/detail')
			) {
				this.setState({
					showNav: false
				})
			}
		}

		componentWillReceiveProps() {
			if (window.location.search.indexOf("value") > 0) {
				document.title = "交易明细";
				window.title = "交易明细";
			}
			// if (window.location.pathname.includes('AdvertisingSpending')) {
			// 	console.log('sadasd')
			// }
			// console.log(this.props)
		}


		render() {
			return (
				<div style={{ width: '100%' }}>
					<Flex className={styles.header} justify="center" style={{ display: this.state.showNav ? '' : 'none' }}>
						<img onClick={this.goBack} src={require('./icon-back@2x.png')} className={styles.backImg} />
						{window.title}
					</Flex>
				</div>
			);
		}
	})
