import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from '../../index.less';
import moment from 'moment';

interface Props {
	log: any[];
}

export default class ExpenseCalendar extends Component<Props> {
	render() {
		const tableItems = this.props.log.map(_ => (
			<Flex className={styles.tableItem} key={_.create_time}>
				<Flex.Item>{moment.unix(_.create_time).format('YYYY-MM-DD')}</Flex.Item>
				<span>{_.event}</span>
				<Flex.Item>{0}</Flex.Item>
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
