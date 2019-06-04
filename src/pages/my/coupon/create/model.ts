import { Model } from 'dva';

export interface CouponForm {
	coupons_type: number;
	coupons_name: number;
	return_money: number;
	total_num: number;
	pay_money: number;
	validity: number;
	description: any[];
	image: string;
	image_url: any[];
}

const model: Model = {
	namespace: 'createCoupon',
	state: {
		couponForm: {},
		moneyForm: {}
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
		setMoney(state, { payload }) {
			return {
				...state,
				moneyForm: {
					...state.couponForm,
					...payload
				}
			};
		}
	},
	effects: {}
};

export default model;
