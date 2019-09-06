import { Model } from 'dva';

const model:Model = {
    namespace: 'groupSetting',
    state : {
        isHaveData: false,
        storeItems: []
    },
    reducers : {
        changeIsHaveData(state,{payload}) {
            return {
                ...state,
                isHaveData : payload.flag
            }
        },
        ReduStoreItem(state,{payload}) {
            return {
                ...state,
                storeItems : [
                    ...payload.storeItems
                ]
            }
        }
    }
}

export default model;