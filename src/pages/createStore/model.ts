import { Model } from 'dva';

interface CreateStore {
  name: string;
  address: string;
  house_num: string;
  phone: string;
  manage_type: string;
  value: any[];
  email: string;
  files: any[];
  my_files: any[];
  my_files2: any[];
  store_door_header_img: string;
  store_img_one: string;
  store_img_two: string;
  location: {
    longitude: number,
    latitude: number
  };
  imgshow1: boolean,
  imgshow2: boolean,
  imgshow3: boolean
  map: {
    value: any[];
    city: any[];
    city_name: string;
    province: string;

  }
}


const model: Model = {
  namespace: 'createStore',
  state: {
    /**店铺名 */
    name: '',
    /**店铺地址 */
    address: '',
    /**门牌号 */
    house_num: '',
    /**门店电话 */
    phone: '',
    /**经营范围 */
    manage_type: '',
    /**邮箱 */
    email: '',
    /**二维码 */
    _code: '',
    value: [],
    /**门头照 */
    files: [],
    /**个人照 */
    my_files: [],
    /**个人照 */
    my_files2: [],
    /**门头照图片 */
    store_door_header_img: '',
    /**个人照1 */
    store_img_one: '',
    /**个人照2 */
    store_img_two: '',
    /**经纬度 */
    location: {
      longitude: 113.3348617553711,
      latitude: 23.18288803100586
    },
    imgshow1: false,
    imgshow2: false,
    imgshow3: false,
    map: {
      value: [],
      city: [],
      city_name: '',
      province: ''
    }
  },
  reducers: {
    setStore(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }

  }
}
export default model;
