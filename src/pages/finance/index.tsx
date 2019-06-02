/**
 * title: 财务
 */

import React, { Component } from 'react';
import FiltrateLayout from '@/components/layout';
import { Flex } from 'antd-mobile';
import styles from './index.less';
import { FinanceItem } from './model';
import { connect } from 'dva';

interface Props {
	data: FinanceItem[];
	dispatch: (arg0: any) => any;
}

export default connect(({ finance }: any) => finance)(
	class FinancePage extends Component<Props> {
		componentDidMount() {
			this.props.dispatch({ type: 'finance/getData' });
		}

		render() {
			const undetermined = [
				{ id: 3, label: '线下收银' },
				{ id: 5, label: '余额提现' },
				{ id: 6, label: '广告收益' },
				{ id: 13, label: '费率返点' }
			];
			const layoutAfter = {
				title: '金额',
				context: (
					<Flex className={styles.layoutAfter}>
						<Flex className="input-wrap">
							￥<input placeholder="最低金额" type="text" />
						</Flex>
						<div className="line" />
						<Flex className="input-wrap">
							￥<input placeholder="最高金额" type="text" />
						</Flex>
					</Flex>
				)
			};
			const financeList = this.props.data.length ? (
				this.props.data.map(_ => (
					<Flex key={_.id} className={styles.financeItem}>
						<img src={_.small_icon} alt="" />
						<Flex.Item className="content">
							<div className="ordernum">{_.type}</div>
							<div className="time">{_.create_time}</div>
						</Flex.Item>
						<div className="more">
							<div>-{_.money}</div>
							<span className="status">{_.msg}</span>
						</div>
					</Flex>
				))
			) : (
				<Flex justify="center">无数据</Flex>
			);

			return (
				<FiltrateLayout after={layoutAfter} undetermined={undetermined}>
					{financeList}
				</FiltrateLayout>
			);
		}
	}
);
