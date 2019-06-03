/**title: 团卖物联 */

import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon } from 'antd-mobile';
import verificationImage from '../assets/varied/verification@2x.png';
import { connect } from 'dva';
import router from 'umi/router';
import { Data } from '@/models/app';

interface Props {
	data: Data;
	dispatch: (arg0: any) => any;
}

export default connect(({ app }: any) => app)(
	class IndexPage extends Component<Props> {
		/**是否显示核销的界面 */
		state = {
			showVerification: false
		};

		componentDidMount() {
			this.props.dispatch({
				type: 'app/getData'
			});
		}

		/**核销 */
		handleVerification = () => this.setState({ showVerification: !this.state.showVerification });
		/**跳转到任意页面 */
		toPage = (pathname: any) => () => {
			router.push({ pathname });
		};

		/**审核页面 */
		verificationPage = () =>
			this.state.showVerification ? (
				<Flex className={styles.verificationPage} justify="end" direction="column">
					<Flex className="icons">
						<Flex.Item>
							<Flex justify="center" direction="column">
								<img src={require('../assets/menu/15.png')} />
								扫码验证
							</Flex>
						</Flex.Item>
						<Flex.Item>
							<Flex justify="center" direction="column">
								<img src={require('../assets/menu/16.png')} />
								输码验证
							</Flex>
						</Flex.Item>
					</Flex>
					<Flex className="close-icon" align="center" justify="center">
						<Icon type="cross-circle-o" color="rgba(0, 0, 0, 0.2)" onClick={this.handleVerification} />
					</Flex>
				</Flex>
			) : null;

		render() {
			const { data } = this.props;
			const mapIcons = (list: Array<any>) =>
				list.map(_ => (
					<Flex direction="column" justify="center" key={_.name}>
						<img src={_.small_icon} className="icon" />
						<div className="label">{_.name}</div>
					</Flex>
				));
			return (
				<div className={styles.page}>
					{/* <NavBar mode="light">团卖物联</NavBar> */}
					{/* 数字信息 */}
					<div className={styles.numberInfo}>
						<Flex justify="center">
							<div className="matter">
								<Flex align="end" justify="center">
									<span className="label">余额</span>
									<span className="value">{data.money}</span>
								</Flex>
								<Flex justify="center">
									<div className="btn">提现</div>
									<div className="btn" onClick={this.toPage('/my/rechange')}>
										充值
									</div>
								</Flex>
							</div>
						</Flex>
					</div>
					{/* 页面内容 */}
					<WingBlank className={styles.content}>
						<div className={styles.box}>
							<div className="title">活动管理</div>
							<div className="inside">{mapIcons(data.activity_management)}</div>
						</div>
						<div className={styles.box}>
							<div className="title">广告管理</div>
							<div className="inside">{mapIcons(data.ad_management)}</div>
						</div>
						<div className={styles.box}>
							<div className="title">资产管理</div>
							<div className="inside">{mapIcons(data.property_management)}</div>
						</div>
					</WingBlank>
					{/* 核销按钮 */}
					<Flex
						onClick={this.handleVerification}
						className={styles.verification}
						justify="center"
						align="center"
						direction="column"
					>
						<img src={verificationImage} />
						核销
					</Flex>
					{this.verificationPage()}
				</div>
			);
		}
	}
);
