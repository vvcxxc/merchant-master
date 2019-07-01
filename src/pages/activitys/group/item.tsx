import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default function GroupItem({
	onClick = (id: number, type: string) => {},
	id = 0,
	name = '',
	total_num = 0,
	user_count = 0,
	image = '',
	activity_begin_time = '',
	activity_end_time = '',
  participation_number = 0,
  type = ''
}) {
	const handleClick = () => onClick(id,type);
	return (
		<Flex className={styles.groupItem} align="end" onClick={handleClick}>
			<img src={image} alt="" className="main-img" />
			<Flex.Item className="content">
				<div className="title">
					<span>{name}</span>
					<span className="sub">{participation_number}人团</span>
				</div>
				<div className="time">
					{activity_begin_time}-{activity_end_time}
				</div>
				<div className="detail">
					<span>已开团{total_num}</span>
					<span>成功拼团{user_count}</span>
				</div>
			</Flex.Item>
			<Flex className="btn" justify="center">
				<img src={require('./icon.png')} />
				分享
			</Flex>
		</Flex>
	);
}
