import { Model } from 'dva';

// type存放在model中可防止切换顶部Tab时然后某个推广原本没数据的 然后切回来时出现问题
const model: Model = {
    namespace: 'ad',
    state: {
        popType: null,
        romotionType: 1, // 推广ID
        adStatus: {},
        coupon: {
            label: '',
            value: 0
        },
        startTime: undefined,
        endTime: undefined,
        price: '',
        files: [],


    },
    reducers: {
        setType(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        setRomotionType(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        resetRomotionType(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        setStatus(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },

        resetAllData(state) {
            return {
                ...state,
                popType: null,
                romotionType: 1,
                adStatus: {},
                coupon: {
                    label: '',
                    value: 0
                },
                startTime: undefined,
                endTime: undefined,
                price: '',
                files: [],
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

export default model;