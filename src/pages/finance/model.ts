import { Model } from 'dva'

export interface Finance {
  listData: Array<any>,
  page: string |number,
  end_time: string | number,
  start_time: string | number,
  from: string | number,
  type: string | number
}

const model: Model = {
  namespace: 'finance',
  state: {
    Finance: {
      ListData: [],
      page:'',
      end_time:'',
      start_time:"",
      payType:"",
      type:""
    }
  },
  reducers: {

    setFinance(state, { payload }) {
      return {
        ...state,
        Finance: {
          ...state.Finance,
            ...payload
        }

      }
    }

  }
}

export default model