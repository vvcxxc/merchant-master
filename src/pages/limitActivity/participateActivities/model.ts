import { Model } from 'dva'

export interface participateActive{
  startTime: string | number,
  endTime: string | number,
  activeTime: string | number,
  cardVoucherType: boolean,//卡券类型
  /**现金券 */
  cash_denomination: string | number,
  cash_threshold: string | number,
  cash_validTime: string | number,
  cash_number: string | number,
  /**商品券 */
  shop_name: string | number,
  shop_originalCost: string | number,
  shop_validTime: string | number,
  shop_number: string | number,
  shop_useRules: string | number,
  /* 活动图片 */
  imgUrl: Array<any>,
  description:Array<any>
}

const model: Model = {
  namespace: 'participateActive',
  state: {
    startTime: '',
    endTime: '',
    activeTime: '',//活动时间
    cardVoucherType: false,//卡券类型
    /**现金券 */
    cash_denomination: '',//卡券面额
    cash_threshold: '',//使用门槛
    cash_validTime: '',
    cash_number: '',
    /**商品券 */
    shop_name: '',
    shop_originalCost: '',//原价
    shop_validTime: '',//有效期
    shop_number: '',
    shop_useRules: '', 
    /**活动图片 */
    imgUrl: [],
    description:[]//使用须知数据
  },
  reducers: {
    setParticipateActive(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default model;