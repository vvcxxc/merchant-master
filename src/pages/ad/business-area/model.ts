import { Model } from "dva";

const model: Model = {
  namespace: 'businessArea',
  state: {
    coupon: {},
    hasCoupon: false
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
    }
  }
}

export default model
