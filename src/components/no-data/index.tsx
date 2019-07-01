import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import styles from './index.less';

interface Props {
	type: string;
}

/**没有数据的情况 */
export default class NoData extends Component<Props> {
	infos = [
		{ type: 'order', img: require('./finance-nodata.png'), info: '暂无订单信息' },
		{ type: 'finance', img: require('./order-nodata.png'), info: '暂无财务信息' }
	];
	render() {
		const infoItem: any = this.infos.find((_: any) => _.type === this.props.type);
		return (
			<Flex justify="center" direction="column" align="center" className={styles.noData}>
				<img src={infoItem.img} />
				{infoItem.info || '暂无数据'}
			</Flex>
		);
	}
}
