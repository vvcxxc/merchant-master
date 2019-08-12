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
  remark: string;
}

/**列表 */
const data: FinanceItem[] = [];

const model: Model = {
  namespace: 'finance',
  state: {
    data,
    hasMore : true,
    // page : 1
  },
  reducers: {
    setData(state, { payload : data, payload : hasMore }) {
      // console.log(data.data)
      return {
        ...state,
        data : state.data.concat(data.data),
        hasMore : hasMore,
        // page : state.page + 1
      };
    },
    removeData(state) {
      return {
        ...state,
        data : [],
        hasMore : true,
        // page : 1
      }
    }
  },
  effects: {
    *getData({ query }, { call, put }): any {
      Toast.loading('加载数据');
      const res = yield call(request, { url: 'v3/finance/merchant_bill', params: query });
      yield put({ type: 'setData', payload: { data: res.data , hasMore : res.data.length > 0 ? true : false } });
      Toast.hide();
    },
    *clearData({}, { put }) : any {
      yield put({type : 'removeData'})
    } 
  }
};

export default model;
