import { Model } from 'dva'

export interface Finance {
  listData: Array<any>,
  page: string |number,
  end_time: string | number,
  start_time: string | number,
  from: string | number,
  type: string | number,
  isHaveData: boolean,
  transaction_amount:string | number,
  transaction_number: string | number
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
      type: "",
      isHaveData: false,
      transaction_number: 0,
      transaction_amount:0
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