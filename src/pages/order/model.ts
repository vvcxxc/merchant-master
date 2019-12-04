import { Model } from 'dva';

interface OrderList {
  list: Array<any>
}
const model: Model = {
  namespace: 'orderList',
  state: {
    list: [],
    total: 0,
    amount: 0
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
    }
  }
}

export default model
