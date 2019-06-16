import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import GroupItem, { Item } from './item';
import AddButton from '../components/add-button';
import router from 'umi/router';
import request from '@/services/request';

export default class Group extends Component {
	state = { data: [] };
	componentDidMount = () => this.getData(1);
	handleChange = (id: any) => this.getData(id);
	handleAdd = () => router.push('appreciation/createAppreciation');
	getData = async (type: any) => {
		Toast.loading('');
		const res = await request({ url: 'api/merchant/youhui/appreciation_activity', params: { type } });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	render() {
		const tabs = [{ id: 1, label: '进行中' }, { id: 2, label: '待生效' }, { id: 3, label: '已结束' }];
		const groups = this.state.data.map((_: Item) => <GroupItem key={_.id} {..._} />);
		return (
			<TabPage tabs={tabs} onChange={this.handleChange}>
				<Flex direction="column" style={{ height: '100%' }}>
					<Flex.Item className={styles.pageContent}>
						<WingBlank>{groups}</WingBlank>
						<AddButton onClick={this.handleAdd} />
					</Flex.Item>
				</Flex>
			</TabPage>
		);
	}
}
