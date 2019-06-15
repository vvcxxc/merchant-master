import TabPage from '@/components/tab-page';
import React, { useState } from 'react';

interface Props {
	children: any[];
}

export default function AdLayout({ children }: Props) {
	const [tab, setTab] = useState(0);
	const handleTabChange = (tab: any) => setTab(tab);
	const tabs = [{ id: 0, label: '广告设置' }, { id: 1, label: '消费记录' }, { id: 2, label: '广告统计' }];
	const content = children[tab];

	return (
		<TabPage value={0} tabs={tabs} onChange={handleTabChange}>
			{content}
		</TabPage>
	);
}
