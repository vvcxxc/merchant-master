import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export interface Item {
	onClick: (id: number, type: string) => any;
	id: number;
	name: string;
	list_brief: string;
	return_money: string;
	total_num: number;
	init_money: string;
	user_count: number;
	activity_begin_time: string;
	activity_end_time: string;
	type: string,
	appreciation_number_sum:string
}


export default function GroupItem(props: Item) {
	const handleClick = () => {
		props.onClick(props.id, props.type)
	}
	return (
		<Flex className={styles.groupItem} align="end" onClick={handleClick}>
			<Flex.Item className="content">
				<div className="title">
					<span>{props.name}</span>
				</div>
				<div className="time">
					{props.activity_begin_time}-{props.activity_end_time}
				</div>
				<div className="detail">
					<span>已参与{props.appreciation_number_sum}</span>
					<span>最高可增值{props.return_money}</span>
				</div>
			</Flex.Item>
			{/* <Flex className="btn" justify="center"> */}
			{/* <img src={require('./icon.png')} /> */}
			{/* 分享 */}
			{/* </Flex> */}
		</Flex>
	);
}
