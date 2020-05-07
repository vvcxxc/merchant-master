import { Model } from 'dva';

const model: Model = {
  namespace: 'gift',
  state: {
    gift_list: [], // 礼品列表
    type: null,
    num: 0,
    list: []
  },
  reducers: {
    setData(state:any, {payload}){
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default model
