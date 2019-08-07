import { Model } from 'dva';

// type存放在model中可防止切换顶部Tab时然后某个推广原本没数据的 然后切回来时出现问题
const model: Model = {
    namespace: 'ad',
    state : {
        popType : null,
    },
    reducers: {
        setType(state,{payload}) {
            return {
                ...state,
                ...payload
            }
        }
    }
}

export default model;