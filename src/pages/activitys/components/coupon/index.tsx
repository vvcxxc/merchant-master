import React from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';

const types = ['返', '减'];

type Any = any;

interface Props extends Any {
	type: number;
	onClick: (id: number) => any;
	/**是否是支付返券 */
	isPayment: boolean;
	/**页面状态 0 进行中 1 未生效 2 已结束  */
	pageStatus: number;
}

export default function Coupon(props: Props) {
	let tags =
		props.tag &&
		props.tag.map((_: string) => (
			<div className="label" key={_}>
				{_}
			</div>
		));
	if (props.isPayment) {
		tags = props.coupon.map((_: any) => (
			<div className="label" key={_.label}>
				{_.label}
			</div>
		));
	}
	const handleClick = () => props.onClick(props.activity_id);
	const statusMsg = props.pageStatus === 0 ? '即将结束' : props.begin_time + '-' + props.end_time;
	return (
		<div className={styles.coupon} onClick={handleClick}>
			<Flex className="content">
				<div className="headimg">{types[props.isPayment ? 0 : props.type]}</div>
				<Flex.Item className="info">
					<Flex className="title">
						{props.name}
						<Flex.Item className="status">{statusMsg}</Flex.Item>
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
