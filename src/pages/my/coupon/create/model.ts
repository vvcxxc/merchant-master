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
    couponForm: {
      coupons_type: 0,
      description: [],
      temp_url1: [],
      temp_url2: [],
      temp_url3: [],
      isDelivery:false,
      isLimit: false
    },
    moneyForm: {
      coupons_type: 1,
      money_temp_url1: [],
      money_temp_url2: [],
      money_temp_url3: [],
      isLimit: false
    }
  },
  reducers: {
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
    }
  },
  effects: {}
};

export default model;
