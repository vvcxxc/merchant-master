import { Model } from 'dva';

export interface Group {
  mail_mode: string;
  activity_name: string;
  old_price: string;
  participation_money: string;
  group_number: string;
  group_sum: string;
  validity: string;
  cover_img: Array<any>;
  describe_img1: Array<any>;
  describe_img2: Array<any>;
  image: string;
  image_url1: string;
  image_url2: string;
  gift_id: string;
  gift_pic: string;
  gift_name: string;
  keys: string;
  description: Array<any>;
  pay_list: Array<any>;
}

const model: Model = {
  namespace: 'activity',
  state: {
    Group: {

    }
  },
  reducers: {
    setGroup(state, { payload }) {
      return {
        ...state,
        Group: {
          ...state.Group,
          payload
        }
      }
    }
  }
}

export default model
