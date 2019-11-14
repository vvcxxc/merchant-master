import styles from './index.less';
import React, { useState } from 'react';
import { WingBlank, Flex } from 'antd-mobile';


interface Props {
	undetermined: Undetermined;
	undetermined2?: any;
	onChange: (id: number | string, _id: number | string|undefined) => any;
	onHide: () => any;
	show: boolean /**后备条件 */;
	after?: After;
}

export interface After {
	/**标题 */
	title: string;
	/**条件 */
	context: any;
}

/**待选择条件列表 */
export type Undetermined = object;

/**待选择的项目 */
interface Item {
	id: string | number;
	_id: string | number;//条件2id
	label: any;
	checked?: boolean;
	_checked?: boolean;//条件2选中
}

/**条件模态框口 */
export default function UndeterminedModal({ undetermined, undetermined2, onChange, show, after, onHide }: Props) {
	const [checked, setChecked,] = useState();
	const [_checked, set_Checked] = useState();
	const { small_box2, small_box } = styles
	/**点击某个条件时 */
	const handleClickUndetermined = (index: number, item: Item): any => () => {
		setChecked(item.id);
	};
	/**点击某个条件时2*/
	const handleClickUndetermined2 = (index: number, item: Item): any => () => {
		set_Checked(item._id);
	};
	const submit = () => {
		onChange(checked, _checked)};
	const _reset = () => {
		setChecked(undefined);
		set_Checked(undefined);
		onChange('', undefined);//_id重置自给自足，财务列表id重置要通知一下金额框清空，所以留点变化
  };

	/**渲染条件列表 */
	const undeterminedList = undetermined.list.map((_: any, index: any) => (
		<Flex
			key={_.id}
			align="center"
			justify="center"
			onClick={handleClickUndetermined(index, _)}
			className={_.id === checked ? 'checked undetermined' : 'undetermined'}
		>
			{_.label}
		</Flex>
  ));

	/**渲染条件列表2 */
	const undeterminedList2 = undetermined2 ? undetermined2.list.map((_: any, index: any) => (
		<Flex
			key={_._id}
			align="center"
			justify="center"
			onClick={handleClickUndetermined2(index, _)}
			className={_._id === _checked ? small_box2 : small_box}
		>
			{_.label}
		</Flex>
	)) : null;

	/**备用条件 */
	const afterContext = after && (
		<div>
			<div className="after-title">{after.title}</div>
			{after.context}
		</div>
	);
	/**父级点击事件 */
	const maskClick = (e: any) => {
		if (e.target.id === 'layoutModal') {
			setChecked(-1);
			set_Checked(-1)
			onHide();
		}
	};
	return (
		<div
			className={styles.layoutModal}
			style={{ display: show ? 'block' : 'none' }}
			id="layoutModal"
			onClick={maskClick}
		>
			<div className="content">

				<WingBlank>
          <div className="title">{undetermined.title}</div>
					<div className="undetermined-list">{undeterminedList}</div>
					{afterContext}
				</WingBlank>
				{
					undetermined2 ? <WingBlank>
						<div className="title">交易时间</div>
						{/* <div className="undetermined-list">{undeterminedList2}</div> */}
						<div style={{ display: 'Flex', justifyContent: 'space-around' }}>{undeterminedList2}</div>
					</WingBlank> : null
				}


			</div>
			<Flex style={{ backgroundColor: '#fff', height: '1.3rem' }}>
				<Flex.Item className="btn" onClick={_reset}>
					重置
				</Flex.Item>
				<Flex.Item className="btn" onClick={submit}>
					确认
				</Flex.Item>
			</Flex>
		</div>
	);
}
