import { Model } from 'dva';

export interface Group {
  mail_mode: string;
  activity_name: string;
  old_price: string;
  participation_money: string;
  group_number: string;
  group_sum: string;
  validity: string;
  scope_mode: number;
  cover_img: Array<any>;
  describe_img1: Array<any>;
  describe_img2: Array<any>;
  image: string;
  image_url1: string;
  image_url2: string;
  gift_id: string;
  gift_pic: string;
  gift_name: string;
  postage:string;
  keys: string;
  description: Array<any>;
  pay_list: Array<any>;
  // 商品设置
  // isHaveData: Boolean;
  storeItems: Array<any>;
  headImg: string;
  giftImg: string;
  activity_image:string
}

export interface Appreciation {
  activityName: string;
  start_date: string | number;
  end_date: string | number;
  gift_id: string;
  gift_pic: string;
  gift_name: string;
  postage: string;
  start_price: string;
  end_price: string;
  appreciation_number_sum: string;
  validity: string;
  cover_img: Array<any>;
  describe_img1: Array<any>;
  describe_img2: Array<any>;
  image: string;
  image_url1: string;
  image_url2: string;
  pay_money: string;
  total_num: string;
  total_fee: string;
  mail_mode: string;
  name_mode: number;
  activity_coupons_type: number;
  shoppingSetting: Array<any>;
  description: Array<any>;
  pay_list: object;
}
const model: Model = {
  namespace: 'activity',
  state: {
    Group: {
      cover_img: [],
      describe_img1: [],
      describe_img2: [],
      mail_mode: '1',
      scope_mode:0,
      // 商品设置
      // isHaveData: false,
      storeItems: []
    },
    Appreciation: {
      mail_mode: '1',
      name_mode: 0,
      activity_coupons_type:1,
      cover_img: [],
      describe_img1: [],
      describe_img2: [],
    },
    details: {
      headImg: '1',
      giftImg: '1',
      activity_image: '1',
      longCanvas: '1',
      shortCanvas:'1'
    }
  },
  reducers: {
    // changeIsHaveData(state, { payload }) {
    //   return {
    //     ...state,
    //     Group: {
    //       ...state.Group,
    //       isHaveData: payload.flag
    //     },
    //   }
    // },
    setDetails(state,{payload}) {
      return {
        ...state,
        details: {
          ...state.details,
          ...payload
        }
      }
    },
    ReduStoreItem(state, { payload }) {
      return {
        ...state,
        Group: {
          ...state.Group,
          storeItems: [
            ...payload.storeItems
          ]
        },
      }
    },
    setGroup(state, { payload }) {
      return {
        ...state,
        Group: {
          ...state.Group,
          ...payload
        },
      }
    },
    setAppreciation(state, { payload }) {
      return {
        ...state,
        Appreciation: {
          ...state.Appreciation,
          ...payload
        }
      }
    },
    Clean(state) {
      return {
        ...state,
        Group: {
          cover_img: [],
          describe_img1: [],
          describe_img2: [],
          mail_mode: '1',
          scope_mode:0,
          storeItems: []
        },
        Appreciation: {
          cover_img: [],
          describe_img1: [],
          describe_img2: [],
          mail_mode: '1',
          name_mode: 0,
      activity_coupons_type:1,
        }
      }
    }
  }
}

export default model
