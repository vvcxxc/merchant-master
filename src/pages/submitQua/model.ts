import { Model } from 'dva';

interface SubmitQua {
  bankShow: boolean,
  id_back: any[];
  id_front: any[];
  id_hand: any[];
  date: string;
  bank_front: any[];
  bank_back: any[];
  license_img: any[];
  modal1img: any[];
  legal_id_front_img: string;
  legal_id_back_img: string;
  three_certs_in_one_img: string;
  hand_hold_id_img: string;
  bank_card_front_img: string;
  bank_card_back_img: string;
  contact_name: string;
  legal_id_no: string;
  settle_bank_account_no: string;
  settle_bank: string;
  bank_name: string;
  settle_bank_account_name: string;
  three_certs_in_one_no: string;
  corn_bus_name: string;
  legal_name: string;
  three_certs_in_one_valid_date: string;
  is_id_front: boolean,
  is_id_back: boolean,
  is_id_hand: boolean,
  is_bank_front: boolean,
  is_bank_back: boolean,
  is_license: boolean,
  Banklicense_img: any[];//银行许可证
  Bank_license_imgUrl: string,
  Bank_is_license: boolean,
  dredgeType: string | number,
  is_existence: string | number,
}

const model: Model = {
  namespace: 'submitQua',
  state: {
    id_back: [],
    id_front: [],
    id_hand: [],
    date: [],
    bank_front: [],
    bank_back: [],
    license_img: [],
    modal1img: [],
    legal_id_front_img: '',
    legal_id_back_img: '',
    three_certs_in_one_img: '',
    hand_hold_id_img: '',
    bank_card_front_img: '',
    bank_card_back_img: '',
    contact_name: '',
    legal_id_no: '',
    settle_bank_account_no: '',
    settle_bank: '',
    bank_name: '',
    settle_bank_account_name: '',
    three_certs_in_one_no: '',
    corn_bus_name: '',
    legal_name: '',
    three_certs_in_one_valid_date: '',
    is_id_front: false,
    is_id_back: false,
    is_id_hand: false,
    is_bank_front: false,
    is_bank_back: false,
    is_license: false,
    date_back: false,
    bank_disable: false,
    bankShow: false,
    Banklicense_img: [],
    Bank_license_imgUrl: '',
    Bank_is_license: false,
    dredgeType: 2,
    is_existence: 0

  },
  reducers: {
    setQua(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default model
