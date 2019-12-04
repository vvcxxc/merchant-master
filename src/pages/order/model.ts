import { Model } from 'dva';

interface OrderList {
  list: Array<any>
}
const model: Model = {
  namespace: 'orderList',
  state: {
    list: [],
    total: 0,
    amount: 0,
    query: {
      pay_status: 2,
      begin: undefined,           // 模糊查询月份
      end: undefined,
      youhui_type: undefined,
      page: 1
    }
  },
  reducers: {
    setList(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    reset(state){
      return {
        ...state,
        list: [],
        // total: '0',
        // amount: '0'
      }
    },
    setQuery(state,{payload}) {
      return {
        ...state,
        query:{
          ...payload
        }
      }
    }
  }
}

export default model
