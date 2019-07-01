import React, { Component } from 'react';
import { Flex, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';

interface Props {
	id?: number;
}
interface Item {
	id: number;
	create_time: string;
	user_name: null;
	status: number;
	image: string;
	status_msg: string;
}

export default class ReceiveList extends Component<Props> {
	state = {
		list: []
	};
	componentDidMount = () => {
		if (this.props.id) {
			this.getData(this.props.id);
		}
	};
	getData = async (id: number) => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/draw/' + id });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ list: res.data });
		}
	};
	render() {
		const list = this.state.list.length ? (
			this.state.list.map((_: Item) => (
				<Flex className="item">
					<img className="headImg" src={_.image} alt="" />
					<Flex.Item>
						<Flex className="title">
							<Flex.Item>{_.user_name}</Flex.Item>
							<span className={_.status === 2 ? 'yellow' : ''}>{_.status_msg}</span>
						</Flex>
						<div className="time">{_.create_time}</div>
					</Flex.Item>
				</Flex>
			))
		) : (
			<Flex direction="column" justify="center" className="noData">
				<img src={require('./noData.png')} />
				<span>暂无领取记录</span>
			</Flex>
		);
		return <div className={styles.receiceList}>{list}</div>;
	}
}
