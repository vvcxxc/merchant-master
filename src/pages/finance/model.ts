import { Model } from 'dva';
import request from '@/services/request';
import { Toast } from 'antd-mobile';

export interface FinanceItem {
	id: number;
	create_time: string;
	money: string;
	type: number;
	order_sn: string;
	is_offline_order: number;
	msg: string;
	small_icon: string;
}

/**列表 */
const data: FinanceItem[] = [];

const model: Model = {
	namespace: 'finance',
	state: {
		data
	},
	reducers: {
		setData(state, { payload }) {
			return {
				...state,
				...payload
			};
		}
	},
	effects: {
		*getData({}, { call, put }): any {
			Toast.loading('加载数据');
			const res = yield call(request, { url: 'v3/finance/merchant_bill' });
			yield put({ type: 'setData', payload: { data: res.data } });
			Toast.hide();
		}
	}
};

export default model;
