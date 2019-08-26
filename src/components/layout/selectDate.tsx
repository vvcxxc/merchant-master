import styles from './index.less';
import React, { useState } from 'react';
import moment from 'moment';
import { WingBlank, Flex, DatePickerView } from 'antd-mobile';

interface Props {
	show: boolean;
	value: string;
	onHide: () => any;
	onChange: (arg0: string|undefined) => any;
}

export default function SelectDate({ show, value, onChange , onHide }: Props) {
	const [date, setDate] = useState(moment(value || undefined).toDate());
	const submit = () => onChange(moment(date).format('YYYY-MM'));
	const reset = () => {
		setDate(new Date());
		onChange(undefined);
	};
	const handleDateChange = (value: Date) => {
		setDate(value);
	};

	/**父级点击事件 */
	const maskClick = (e: any) => {
		if (e.target.id === 'layoutModal') {
			setDate(moment(value || undefined).toDate());
			onHide();
			// onChange(value);
		}
	};
	return show ? (
		<div className={styles.layoutModal} id="layoutModal" onClick={maskClick}>
			<div className="content">
				<WingBlank>
					<Flex direction="column" className={styles.dateModal}>
						<Flex className="date-show" justify="center">
							{moment(date).format('YYYY-MM')}
						</Flex>
						<Flex.Item style={{ width: '100%' }}>
							<DatePickerView value={date} mode="month" onChange={handleDateChange} />
						</Flex.Item>
					</Flex>
				</WingBlank>
			</div>

			<Flex style={{ backgroundColor: '#fff' }}>
				<Flex.Item className="btn" onClick={reset}>
					重置
				</Flex.Item>
				<Flex.Item className="btn" onClick={submit}>
					确认
				</Flex.Item>
			</Flex>
		</div>
	) : null;
}
