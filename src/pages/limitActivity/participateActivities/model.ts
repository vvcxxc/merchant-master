import { Model } from 'dva'

const model: Model = {
  namespace: 'participateActive',
  state: {
    /* 活动时间 */
    active: {
      start_date: '',
      end_date: ''
    },
    /* 卡券类型 */
    coupons_type: 1,
    /**现金券 */
    cash: {
      return_money: '',
      total_fee: '',
      validity: '',
      total_num: ''
    },
    /**商品券 */
    shop: {
      coupons_name: '',
      return_money: '',
      // validity: '',
      validity: '',
      total_num: '',
      image_url: '',
      image: '',
      description: []
    },
    //编辑现金券
    updateCash: {
      return_money: '',
      total_fee: '',
      validity: '',
      total_num: ''
    },
    updateShop: {
      coupons_name: '',
      return_money: '',
      validity: '',
      total_num: '',
      image_url: '',
      image:'',
      description: []
    },
    // inputList: {
    //   end_date: '',
    //   description: [],
    //   name: '',
    //   return_money:''
    // }
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
        coupons_type: payload
      }
    },
    //清除现金券数据
    clearCash(state, { payload }) { 
      return {
        ...state,
        cash: {
        }
      }
    },
    //清除商品券数据
    clearShop(state, { payload }) {
      return {
        ...state,
        shop: {
        }
      }
    } ,
    setUpdateCash(state, { payload }) {//设置商品券数据
      return {
        ...state,
        updateCash: {
          ...state.updateCash,
          ...payload
        }
      }
    },
    setUpdateShop(state, { payload }) {//设置商品券数据
      return {
        ...state,
        updateShop: {
          ...state.updateShop,
          ...payload
        }
      }
    },
    clearUpdateCash(state, { payload }) {
      return {
        ...state,
        updateCash: {
        }
      }
    },
    clearUpdateShop(state, { payload }) {
      return {
        ...state,
        updateShop: {
        }
      }
    },
  }
}

export default model;