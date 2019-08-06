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
}

export interface MoneyForm {
  return_money: string;
  coupons_type: string;
  pay_money: string;
  total_fee: string;
  validity: string;
  total_num: string;
}

const model: Model = {
  namespace: 'createCoupon',
  state: {
    couponForm: {
      coupons_type: 0,
      description: []
    },
    moneyForm: {
      coupons_type: 1
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
