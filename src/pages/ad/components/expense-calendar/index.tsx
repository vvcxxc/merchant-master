import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from '../../index.less';

export default class ExpenseCalendar extends Component {
	render() {
		const tableItems = [1, 2, 3, 4, 5, 6].map(_ => (
			<Flex className={styles.tableItem} key={_}>
				<Flex.Item>时间</Flex.Item>
				<span>事件</span>
				<Flex.Item>消耗</Flex.Item>
			</Flex>
		));
		return (
			<WingBlank>
				<Flex className={styles.totalExpense} justify="end">
					总消耗：1.4
				</Flex>
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
