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
}

export interface MoneyForm {
  return_money: number;
  coupons_type: number;
  pay_money: number;
  total_fee: number;
  validity: number;
  total_num: number;
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
          coupons_type: 1,
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
