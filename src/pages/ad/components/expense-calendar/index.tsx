import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from '../../index.less';
interface Props {
	log: {};
}

export default class ExpenseCalendar extends Component<Props> {
	render() {
		const tableItems = this.props.log.data ? this.props.log.data.map(_ => (
			<Flex className={styles.tableItem} key={_.create_time}>
				<Flex.Item>{_.create_time}</Flex.Item>
				<span>{_.info}</span>
				<Flex.Item>{_.money}</Flex.Item>
			</Flex>
		)) : null;
		{
			/* <Flex className={styles.totalExpense} justify="end">
					总消耗：1.4
				</Flex> */
		}
		return (
			<WingBlank>
				<Flex className={styles.tableHead}>
					<Flex.Item>时间</Flex.Item>
					<span>事件</span>
					<Flex.Item>消耗</Flex.Item>
				</Flex>
				{tableItems}
			</WingBlank>
		);
	}
}
