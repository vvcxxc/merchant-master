import React from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';

const types = ['返', '减'];

type Any = any;

interface Props extends Any {
	type: number;
}

export default function Coupon(props: Props) {
	const tags = props.tag.map((_: string) => (
		<div className="label" key={_}>
			{_}
		</div>
	));
	const handleClick = () => props.onClick(props.activity_id);
	return (
		<div className={styles.coupon} onClick={handleClick}>
			<Flex className="content">
				<div className="headimg">{types[props.type]}</div>
				<Flex.Item className="info">
					<Flex className="title">
						{props.name}
						<Flex.Item className="status">{props.status_msg}</Flex.Item>
					</Flex>
					<div className="labels">{tags}</div>
				</Flex.Item>
			</Flex>
			<Flex className="bottom" justify="end">
				<Flex className="btn" justify="center">
					<img src={require('./icon.png')} />
					分享
				</Flex>
			</Flex>
		</div>
	);
}
