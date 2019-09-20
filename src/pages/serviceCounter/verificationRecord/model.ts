import { Model } from 'dva';
import request from '@/services/request';
import new_request from '@/services/new_request';
import { Toast } from 'antd-mobile';

export interface VerificationItem {
  id: number;
  create_time: string;
  order_sn: string;
  payment_type:number,
  pay_time:number,
  amount:string,
  store_id:number,
  store_name:string,
  user_id:number,
  is_delivery:number,
  delivery_time:number,
  area_id:number,
  service_counter_id:number
}

/**列表 */
const data: VerificationItem[] = [];

const model: Model = {
  namespace: 'verification',
  state: {
    data,
    hasMore : true,
    page : 1
  },
  reducers: {
    setData(state, { payload : data, payload : hasMore }) {
      return {
        ...state,
        data : state.data.concat(data.data),
        hasMore : hasMore,
        page : state.page + 1
      };
    },
    removeData(state) {
      return {
        ...state,
        data : [],
        hasMore : true,
        page : 1
      }
    }
  },
  effects: {
    *getData({ query }, { call, put }): any {
      Toast.loading('加载数据');
      const res = yield call(new_request, { url: 'v3/service/counter/order_list', params: query });
      yield put({ type: 'setData', payload: { data: res.data.data , hasMore : res.data.data.length > 0 ? true : false } });
      Toast.hide();
    },
    *clearData({}, { put }) : any {
      yield put({type : 'removeData'})
    } 
  }
};

export default model;
