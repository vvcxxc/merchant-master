import { Model } from 'dva';

interface OrderList {
  list: Array<any>
}
const model: Model = {
  namespace: 'orderList',
  state: {
    list: [],
    total: '',
    amount: ''
  },
  reducers: {
    setList(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default model
