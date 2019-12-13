import { Model } from 'dva'

const model: Model = {
  namespace: 'participateActive',
  state: {
    /* 活动时间 */
    active: {
      startTime: '',
      endTime: '',
      activeTime: '',
    },
    /* 卡券类型 */
    cardVoucherType: false,
    /**现金券 */
    cash: {
      cash_denomination: '',
      cash_threshold: '',
      cash_validTime: '',
      cash_number: ''
    },
    /**商品券 */
    shop: {
      shop_name: '',
      shop_originalCost: '',
      shop_validTime: '',
      shop_number: '',
      // shop_useRules: '',
      imgUrl: '',
      description: []
    }
  },
  reducers: {
    setActiveTime(state, { payload }) {//设置活动时间
      return {
        ...state,
        active: {
          ...state.active,
          ...payload
        }
      }
    },
    setCash(state, { payload }) {//设置现金券数据
      return {
        ...state,
        cash: {
          ...state.cash,
          ...payload
        }
      }
    },
    setShop(state, { payload }) {//设置商品券数据
      return {
        ...state,
        shop: {
          ...state.shop,
          ...payload
        }
      }
    },
    setActiveType(state, { payload }) {//设置卡券类型
      return {
        ...state,
        cardVoucherType: payload
      }
    },
    //清除现金券数据
    clearCash(state, { payload }) { 
      return {
        ...state,
        cash: {
          // ...state.cash,
          // ...{}
        }
      }
    },
    //清除商品券数据
    clearShop(state, { payload }) {
      return {
        ...state,
        shop: {
          // ...state.shop,
          // ...{}
        }
      }
    }
  }
}

export default model;