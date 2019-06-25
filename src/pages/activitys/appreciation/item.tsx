import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export interface Item {
	id: number;
	name: string;
	list_brief: string;
	return_money: string;
	total_num: number;
	init_money: string;
	user_count: number;
	activity_begin_time: string;
	activity_end_time: string;
}

export default function GroupItem(props: Item) {
	return (
		<Flex className={styles.groupItem} align="end">
			<Flex.Item className="content">
				<div className="title">
					<span>{props.name}</span>
				</div>
				<div className="time">
					{props.activity_begin_time}-{props.activity_end_time}
				</div>
				<div className="detail">
					<span>已参与{props.total_num}</span>
					<span>最高可增值{props.return_money}</span>
				</div>
			</Flex.Item>
			<Flex className="btn" justify="center">
				<img src={require('./icon.png')} />
				分享
			</Flex>
		</Flex>
	);
}
