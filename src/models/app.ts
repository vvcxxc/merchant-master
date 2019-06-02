import { Model } from 'dva';
import { Toast } from 'antd-mobile';
import request from '@/services/request';

const model: Model = {
	namespace: 'app',
	state: {
		pageData: {},
		showVerification: false
	},
	reducers: {
		saveData(state, { payload }) {
			return {
				...state,
				pageData: payload
			};
		},
		setShowVerification(state, { payload }) {
			return {
				...state,
				showVerification: payload
			};
		}
	},
	effects: {
		*getData({}, { put, call }) {
			Toast.loading('获取首页数据');
			const res = yield call(request, { url: 'v3/finance/index' });
			yield Toast.hide();
			yield put({ type: 'saveData', payload: res.data });
		}
	}
};

export default model;
