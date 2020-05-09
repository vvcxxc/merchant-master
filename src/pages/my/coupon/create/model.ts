import { Model } from 'dva';

export interface CouponForm {
  coupons_type: number;
  coupons_name: string;
  return_money: number;
  total_num: number;
  pay_money: number;
  validity: number;
  description: any[];
  image: string;
  image_url: any[];
  temp_url1: any[];
  temp_url2: any[];
  temp_url3: any[];
  shareText: string;
  isDelivery:boolean;
  isLimit: boolean;
  limit_purchase_quantity: string;
}

export interface MoneyForm {
  return_money: string;
  coupons_type: string;
  pay_money: string;
  total_fee: string;
  validity: string;
  total_num: string;
  money_image_url1: string;
  money_image_url2: string;
  money_image_url3: string;
  money_temp_url1: any[];
  money_temp_url2: any[];
  money_temp_url3: any[];
  isLimit: boolean;
  limit_purchase_quantity: string;
}

const model: Model = {
  namespace: 'createCoupon',
  state: {
    type: 0,
    couponForm: {
      coupons_type: 0,
      description: [],
      temp_url1: [],
      temp_url2: [],
      temp_url3: [],
      isDelivery:false,
      isLimit: false,
      image_url:['','','']
    },
    moneyForm: {
      coupons_type: 1,
      money_temp_url1: [],
      money_temp_url2: [],
      money_temp_url3: [],
      isLimit: false,
      total_fee:''
    },
    imageDetails: [],     //兑换券  负责显示给前台用户
    imageDetailsApi: [],  //兑换券  负责提供后台接口所需格式参数
    cashcouponImage: [],//现金券 负责显示给前台用户
    cashcouponImageApi: [],//现金券 负责提供后台接口所需格式参数
    gift: []
  },
  reducers: {
    setCashcouponImage(state, { payload }) {//只处理 现金券图片详情数据
      return {
        ...state,
        cashcouponImage: [
          ...payload
        ]
      }
    },
    setCashcouponImageApi(state, { payload }) {
      return {
        ...state,
        cashcouponImageApi: [
          ...payload
        ]
      }
    },
    clearCashcouponImage(state, { payload }) {
      return {
        ...state,
        cashcouponImageApi: [],
        cashcouponImage: []
      }
    },
    setImageDetails(state, { payload }) {//只处理 兑换券图片详情数据
      return {
        ...state,
        imageDetails: [
          ...payload
        ]
      }
    },
    setImageDetailsApi(state, { payload }) {
      return {
        ...state,
        imageDetailsApi: [
          ...payload,
        ]
      }
    },
    clearImageDetailsApi(state, { payload }) {
      return {
        ...state,
        imageDetails: [],
        imageDetailsApi: []
      }
    },
    setCoupon(state, { payload }) {
      return {
        ...state,
        couponForm: {
          ...state.couponForm,
          ...payload
        }
      };
    },
    reset(state) {
      return {
        ...state,
        couponForm: {
          coupons_type: 0,
          description: []
        },
        moneyForm: {
          coupons_type: 1
        }
      };
    },
    setMoney(state, { payload }) {
      return {
        ...state,
        moneyForm: {
          ...state.moneyForm,
          ...payload
        }
      };
    },
    setGift(state, { payload }) {
      return {
        ...state,
        gift: payload.gift
      }
    },
    setType(state, { payload }) {
      return {
        ...state,
        type: payload.type
      }
    }
  },
  effects: {
    *fetchGift({ payload, callback }, { call, put, select }){
      const res = yield select((state,) => state.gift)
      if(res){
        const gift = res.gift
        yield put({
          type: 'setGift',
          payload: {gift}
        })
      }
    }
  }
};

export default model;
