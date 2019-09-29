import { Model } from "dva";

const model: Model = {
  namespace: 'businessArea',
  state: {
    coupon: {},
    hasCoupon: false,
    startTime: undefined,
    endTime: undefined,
    price: '',
  },
  reducers: {
    setCoupon(state, { payload }) {
      return {
        ...state,
        hasCoupon: true,
        coupon: payload
      }
    },
    resetCoupon() {
      return {
        hasCoupon: false,
        coupon: {}
      }
    },

    resetAllData(state) {
      return {
        ...state,
        coupon: {
          label: '',
          value: 0
        },
        startTime: undefined,
        endTime: undefined,
        price: '',
      }
    },
    setFormData(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default model
