import { Model } from 'dva';
import { Toast } from 'antd-mobile';
import request from '@/services/request';

export interface Data {
  money: number;
  activity_management: ActivityManagementItem[];
  ad_management: AdManagementItem[];
  property_management: PropertyManagementItem[];
}
interface ActivityManagementItem {
  name: string;
  small_icon: string;
}
interface AdManagementItem {
  name: string;
  small_icon: string;
}
interface PropertyManagementItem {
  name: string;
  small_icon: string;
}


const data: Data = {
  activity_management: [],
  ad_management: [],
  property_management: [],
  money: 0
};

const model: Model = {
  namespace: 'app',
  state: {
    data: { ...data },
    showOperationTip: false,
  },
  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    setOperationTipStatus(state, { payload }) {
      return {
        ...state,
        showOperationTip: payload
      }
    }
  },
  effects: {
    *getData({ }, { put, call }) {
      Toast.loading('获取首页数据');
      const res = yield call(request, { url: 'v3/finance/index' });
      yield Toast.hide();
      yield put({ type: 'saveData', payload: res.data });
    }
  }
};

export default model;
