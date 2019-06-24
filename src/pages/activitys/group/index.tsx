import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import GroupItem from './item';
import request from '@/services/request';
import AddButton from '../components/add-button';
import router from 'umi/router';

export default class Group extends Component {
	state = {
		data: []
	};
	componentDidMount = () => this.getData(1);
	getData = async (id?: any) => {
		Toast.loading('');
		const res = await request({ url: 'api/merchant/youhui/group_activity', params: { type: id } });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	handleChange = (id: any) => this.getData(id);
	handleClickAddButton = () => router.push('/activitys/group/createGroup');
	handleClickGroup = (id: number) => {
    router.push({
      pathname: '/activitys/group/details',
      query: {
        id
      }
    })
  };
	render() {
		const tabs = [{ id: 1, label: '进行中' }, { id: 2, label: '待生效' }, { id: 3, label: '已结束' }];
		const groups = this.state.data.map((_: any) => <GroupItem key={_.id} {..._} onClick={this.handleClickGroup} />);
		return (
			<TabPage tabs={tabs} onChange={this.handleChange}>
				<WingBlank>{groups}</WingBlank>
				<AddButton onClick={this.handleClickAddButton} />
			</TabPage>
		);
	}
}
