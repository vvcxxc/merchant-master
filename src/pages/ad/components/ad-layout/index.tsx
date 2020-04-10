import TabPage from '@/components/tab-page';
import React, { useState } from 'react';
import router from 'umi/router';

interface Props {
	children: any[];
	value:any
}

export default function AdLayout({ children,value }: Props) {
	if(value) {
		var [tab, setTab] = useState(1);
	}else {
		var [tab, setTab] = useState(0);
	}
	const handleTabChange = (tab: any) => setTab(tab);
	const tabs = [{ id: 0, label: '广告设置' }, { id: 1, label: '消费记录' }, { id: 2, label: '广告统计' }];
	const content = children[tab];

	return (
		<TabPage value={Number(value) || 0} tabs={tabs} onChange={handleTabChange}>
			{content}
		</TabPage>
	);
}
