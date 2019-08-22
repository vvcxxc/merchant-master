// /**
//  * 提交资质
//  */
import React, { Component } from 'react';
import { WingBlank, Flex, ImagePicker, List, InputItem, Icon, Toast, Modal, ListView } from 'antd-mobile';
import router from 'umi/router';
import upload from '@/services/oss';
import request from '@/services/request';
import moment from 'moment';
import { connect } from 'dva';
import Axios from 'axios';
import styles from './index.less';
import Cookies from 'js-cookie';


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

// window.addEventListener('touchmove',function () {
//   console.log(document.body.scrollHeight)
// })
window.onscroll = function () {
  console.log('aa')
}

export default connect(({ submitQua }: any) => submitQua)(

  class submitQua extends Component<any> {
    state = {
      /**身份证反面照 */
      id_back: [],
      /**身份证正面照 */
      id_front: [],
      /**手持身份证照 */
      id_hand: [],
      /**有效期 */
      date: '2019-09-22',
      /**银行卡正面照 */
      bank_front: [],
      /**银行卡反面照 */
      bank_back: [],
      /**营业执照 */
      license_img: [],
      /**法人身份证正面照 */
      legal_id_front_img: '',
      /**法人身份证反面照 */
      legal_id_back_img: '',
      /**营业执照 */
      three_certs_in_one_img: '',
      /**手持身份证照 */
      hand_hold_id_img: '',
      /**银行卡正面照 */
      bank_card_front_img: '',
      /**银行卡反面照 */
      bank_card_back_img: '',
      /**姓名 */
      contact_name: '',
      /**身份证号 */
      legal_id_no: '',
      /**银行卡号 */
      settle_bank_account_no: '',
      /**银行名 */
      settle_bank: '招商银行',
      /**银行支行 */
      bank_name: '',
      /**开户人 */
      settle_bank_account_name: '',
      /**营业执照号 */
      three_certs_in_one_no: '',
      /**执照名称 */
      corn_bus_name: '',
      /**法人 */
      legal_name: '',
      /**营业执照有效期 */
      three_certs_in_one_valid_date: '',
      /**选择有效期子组件判断是为身份证还是营业执照 */
      type: 1,
      /**控制子组件的显示和隐藏 */
      is_show: false,
      /**传入组件的日期 */
      choose_date: '',
      /**用于二次进入该页面判断之前是否有图片 */
      is_id_front: false,
      is_id_back: false,
      is_id_hand: false,
      is_bank_front: false,
      is_bank_back: false,
      is_license: false,

      is_id_example: false,
      is_bank_example: false,
      is_license_example: false,
      display: 'block',

      flag: true, // 条件判断是否阻止默认行为
      modal1: false,
      modal1img: [],
      bankList: [
        "广东省广州市花都区新华街道商业大道24号建设银行",
        "广东省广州市越秀区广卫路15-1号中国建设银行",
        "广东省广州市白云区鹤龙一路983号广东通信科技大厦南塔1层"
      ],
      bankShow: false
    };



    componentDidMount() {
      //console.log("")
      function getCaption(str: string) {
        return str.split('http://oss.tdianyi.com/')[1]
      }
      // 暂时
      Axios.get('http://release.api.supplier.tdianyi.com/api/v2/up').then(res => {
        let { data } = res.data;
        let oss_data = {
          policy: data.policy,
          OSSAccessKeyId: data.accessid,
          success_action_status: 200, //让服务端返回200,不然，默认会返回204
          signature: data.signature,
          callback: data.callback,
          host: data.host,
          key: data.dir
        };

        window.localStorage.setItem('oss_data', JSON.stringify(oss_data));
      })
      request({
        url: 'v3/payment_profiles',
        method: 'get'
      }).then(res => {
        let { data } = res;
        let { contact_name, legal_id_no, legal_id_valid_date, settle_bank_account_name, settle_bank_account_no, settle_bank, three_certs_in_one_no, corn_bus_name, legal_name, three_certs_in_one_valid_date, bank_name, legal_id_front_img, legal_id_back_img, hand_hold_id_img, bank_card_front_img, bank_card_back_img, three_certs_in_one_img } = data;
        if (three_certs_in_one_valid_date[0] == 0) {
          three_certs_in_one_valid_date = '长期'
        }
        if (three_certs_in_one_valid_date[0] == 0) {
          three_certs_in_one_valid_date = '长期'
        }
        let arr = (this.props.contact_name || this.props.legal_id_no || this.props.date || this.props.settle_bank_account_name || this.props.settle_bank_account_no || this.props.settle_bank || this.props.three_certs_in_one_no || this.props.corn_bus_name || this.props.legal_name || this.props.three_certs_in_one_valid_date || this.props.bank_name || this.props.legal_id_front_img || this.props.legal_id_back_img || this.props.hand_hold_id_img || this.props.bank_card_front_img || this.props.bank_card_back_img || this.props.three_certs_in_one_img)
        // if (
        //   Array.isArray(arr)
        // ) {
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            contact_name: contact_name != "" ? contact_name : (Cookies.get("_handleName") ? JSON.parse(Cookies.get("_handleName")) : ""),
            legal_id_no: legal_id_no != "" ? legal_id_no : (Cookies.get("_legal_id_no") ? JSON.parse(Cookies.get("_legal_id_no")) : ""),
            date: legal_id_valid_date != "" ? legal_id_valid_date : (Cookies.get("_date") ? JSON.parse(Cookies.get("_date")) : ""),
            settle_bank_account_name: settle_bank_account_name != "" ? settle_bank_account_name : (Cookies.get("_handleBankAccountName") ? JSON.parse(Cookies.get("_handleBankAccountName")) : ""),
            settle_bank_account_no: settle_bank_account_no != "" ? settle_bank_account_no : (Cookies.get("_handleBankNum") ? JSON.parse(Cookies.get("_handleBankNum")) : ""),
            settle_bank: settle_bank != "" ? settle_bank : (Cookies.get("_handleSettleBank") ? JSON.parse(Cookies.get("_handleSettleBank")) : ""),
            three_certs_in_one_no: three_certs_in_one_no != "" ? three_certs_in_one_no : (Cookies.get("_handleLicenseNUm") ? JSON.parse(Cookies.get("_handleLicenseNUm")) : ""),
            corn_bus_name: corn_bus_name != "" ? corn_bus_name : (Cookies.get("_handleLicenseName") ? JSON.parse(Cookies.get("_handleLicenseName")) : ""),
            legal_name: legal_name != "" ? legal_name : (Cookies.get("_handleLegalName") ? JSON.parse(Cookies.get("_handleLegalName")) : ""),
            three_certs_in_one_valid_date: three_certs_in_one_valid_date != "" ? three_certs_in_one_valid_date : (Cookies.get("_three_certs_in_one_valid_date") ? JSON.parse(Cookies.get("_three_certs_in_one_valid_date")) : ""),
            bank_name: bank_name != "" ? bank_name : (Cookies.get("_handleBankName") ? JSON.parse(Cookies.get("_handleBankName")) : ""),

            legal_id_front_img: legal_id_front_img != "" ? getCaption(legal_id_front_img) : (Cookies.get("_changeIdFront") ? JSON.parse(Cookies.get("_changeIdFront")) : ""),
            legal_id_back_img: legal_id_back_img != "" ? getCaption(legal_id_back_img) : (Cookies.get("_changeIdBack") ? JSON.parse(Cookies.get("_changeIdBack")) : ""),
            hand_hold_id_img: hand_hold_id_img != "" ? getCaption(hand_hold_id_img) : (Cookies.get("_changeIdHand") ? JSON.parse(Cookies.get("_changeIdHand")) : ""),
            bank_card_front_img: bank_card_front_img != "" ? getCaption(bank_card_front_img) : (Cookies.get("_changeBankFront") ? JSON.parse(Cookies.get("_changeBankFront")) : ""),
            bank_card_back_img: bank_card_back_img != "" ? getCaption(bank_card_back_img) : (Cookies.get("_changeBankBack") ? JSON.parse(Cookies.get("_changeBankBack")) : ""),
            three_certs_in_one_img: three_certs_in_one_img != "" ? getCaption(three_certs_in_one_img) : (Cookies.get("_changeLicense") ? JSON.parse(Cookies.get("_changeLicense")) : ""),

            is_id_front: (legal_id_front_img != "" || Cookies.get("_changeIdFront") && JSON.parse(Cookies.get("_changeIdFront")) != "") ? true : false,
            is_id_back: (legal_id_back_img != "" || Cookies.get("_changeIdBack") && JSON.parse(Cookies.get("_changeIdBack")) != "") ? true : false,
            is_id_hand: (hand_hold_id_img != "" || Cookies.get("_changeIdHand") && JSON.parse(Cookies.get("_changeIdHand")) != "") ? true : false,
            is_bank_front: (bank_card_front_img != "" || Cookies.get("_changeBankFront") && JSON.parse(Cookies.get("_changeBankFront")) != "") ? true : false,
            is_bank_back: (legal_id_back_img != "" || Cookies.get("_changeBankBack") && JSON.parse(Cookies.get("_changeBankBack")) != "") ? true : false,
            is_license: (three_certs_in_one_img != "" || Cookies.get("_changeLicense") && JSON.parse(Cookies.get("_changeLicense")) != "") ? true : false,
            modal1img: [],
            id_back: [],
            id_front: [],
            id_hand: [],
            bank_front: [],
            bank_back: [],
            license_img: []
          }
        })
        // if (legal_id_front_img) {
        //   this.props.dispatch({
        //     type: 'submitQua/setQua',
        //     payload: {
        //       is_id_front: true
        //     }
        //   })
        // }
        // if (legal_id_back_img) {
        //   this.props.dispatch({
        //     type: 'submitQua/setQua',
        //     payload: {
        //       is_id_back: true
        //     }
        //   })
        // }
        // if (hand_hold_id_img) {
        //   this.props.dispatch({
        //     type: 'submitQua/setQua',
        //     payload: {
        //       is_id_hand: true
        //     }
        //   })
        // }
        // if (bank_card_front_img) {
        //   this.props.dispatch({
        //     type: 'submitQua/setQua',
        //     payload: {
        //       is_bank_front: true
        //     }
        //   })
        // }
        // if (bank_card_back_img) {
        //   this.props.dispatch({
        //     type: 'submitQua/setQua',
        //     payload: {
        //       is_bank_back: true
        //     }
        //   })
        // }
        // if (three_certs_in_one_img) {
        //   this.props.dispatch({
        //     type: 'submitQua/setQua',
        //     payload: {
        //       is_license: true
        //     }
        //   })
        // }
        // } else {
        //   return

        // }
      })
    }
    /**查看身份证示例 */
    toIdCardExample = () => {
      router.push('/submitQua/example/idcard')
    }
    /**查看银行卡示例 */
    toBankExample = () => {
      router.push('/submitQua/example/bank')
    }
    /**查看营业执照示例 */
    toLicenseExample = () => {
      router.push('/submitQua/example/license')
    }
    /**姓名输入 */
    handleName = (e: any) => {
      Cookies.set("_handleName", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          contact_name: e
        }
      })
    }
    /**身份证号输入 */
    handleID = (e: any) => {
      Cookies.set("_legal_id_no", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          legal_id_no: e
        }
      })
    }
    /**开户人 */
    handleBankAccountName = (e: any) => {
      Cookies.set("_handleBankAccountName", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          settle_bank_account_name: e
        }
      })
    }
    /**银行卡号 */
    handleBankNum = (e: any) => {
      Cookies.set("_handleBankNum", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          settle_bank_account_no: e
        }
      })
    }
    /**开户银行 */
    handleSettleBank = (e: any) => {
      Cookies.set("_handleSettleBank", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          settle_bank: e
        }
      })
    }
    /**支行 */
    handleBankName = (e: any) => {
      //这里发起请求setstate({bankList})，不用嵌套
      if (e == '' || e == undefined) {
        this.setState({ bankShow: false });
      } else {
        this.setState({ bankShow: true });
      }

      Cookies.set("_handleBankName", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          bank_name: e
        }
      })
    }
    /**注册号 */
    handleLicenseNUm = (e: any) => {
      Cookies.set("_handleLicenseNUm", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          three_certs_in_one_no: e
        }
      })
    }
    /**执照名称 */
    handleLicenseName = (e: any) => {
      Cookies.set("_handleLicenseName", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          corn_bus_name: e
        }
      })
    }
    /**法人名称 */
    handleLegalName = (e: any) => {
      Cookies.set("_handleLegalName", JSON.stringify(e), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          legal_name: e
        }
      })
    }
    /**身份证正面照选择 */
    changeIdFront = (files: any) => {
      // this.props.dispatch({
      //   type: 'submitQua/setQua',
      //   payload: {
      //     id_front: files
      //   }
      // })
      Toast.loading('');
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide();
          let legal_id_front_img = res.data.path;
          Cookies.set("_changeIdFront", JSON.stringify(res.data.path), { expires: 1 });
          this.props.dispatch({
            type: 'submitQua/setQua',
            payload: {
              id_front: files,
              legal_id_front_img: res.data.path
            }
          })
          const { legal_id_back_img, hand_hold_id_img } = this.props;
          if (legal_id_back_img && legal_id_front_img && hand_hold_id_img) {
            Toast.loading('识别中', 0)
            request({
              url: 'v3/idcard',
              method: 'get',
              params: {
                idcard_back_img: legal_id_back_img,
                idcard_front_img: legal_id_front_img
              }
            }).then(res => {
              let { data } = res;
              let id = data.front.words_result['公民身份号码'].words
              let name = data.front.words_result['姓名'].words;
              let date = data.back.words_result['失效日期'].words;
              if (date != '长期') {
                date = moment(date).format("YYYY-MM-DD")
              }
              if (id && name) {
                Toast.hide();
                Cookies.set("_handleName", JSON.stringify(name), { expires: 1 });
                Cookies.set("_legal_id_no", JSON.stringify(id), { expires: 1 });
                Cookies.set("_date", JSON.stringify(date), { expires: 1 });
                this.props.dispatch({
                  type: 'submitQua/setQua',
                  payload: {
                    contact_name: name,
                    legal_id_no: id,
                    date
                  }
                })

              } else {
                Toast.fail('识别失败', 1);
              }

            }).catch(err => {
              Toast.fail('识别失败', 1)
            })
          }
        });
      } else {
        Toast.hide();
        Cookies.set("_changeIdFront", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            id_front: files,
            legal_id_front_img: ''
          }
        })
      }
    }
    /**身份证反面选择 */
    changeIdBack = (files: any) => {
      // this.props.dispatch({
      //   type: 'submitQua/setQua',
      //   payload: {
      //     id_back: files
      //   }
      // })
      Toast.loading('');
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide();
          let legal_id_back_img = res.data.path;
          Cookies.set("_changeIdBack", JSON.stringify(res.data.path), { expires: 1 });
          this.props.dispatch({
            type: 'submitQua/setQua',
            payload: {
              id_back: files,
              legal_id_back_img
            }
          })
          const { legal_id_front_img, hand_hold_id_img } = this.props;
          if (legal_id_back_img && legal_id_front_img && hand_hold_id_img) {
            Toast.loading('识别中', 0)
            request({
              url: 'v3/idcard',
              method: 'get',
              params: {
                idcard_back_img: legal_id_back_img,
                idcard_front_img: legal_id_front_img
              }
            }).then(res => {
              let { data } = res;
              let id = data.front.words_result['公民身份号码'].words
              let name = data.front.words_result['姓名'].words;
              let date = data.back.words_result['失效日期'].words;
              if (date != '长期') {
                date = moment(date).format("YYYY-MM-DD")
              }
              if (id && name) {
                Cookies.set("_handleName", JSON.stringify(name), { expires: 1 });
                Cookies.set("_legal_id_no", JSON.stringify(id), { expires: 1 });
                Cookies.set("_date", JSON.stringify(date), { expires: 1 });
                Toast.hide();
                this.props.dispatch({
                  type: 'submitQua/setQua',
                  payload: {
                    contact_name: name,
                    legal_id_no: id,
                    date
                  }
                })
              } else {
                Toast.fail('识别失败', 1);
              }
            }).catch(err => {
              Toast.fail('识别失败', 1)
            })
          }
        });
      } else {
        Toast.hide();
        Cookies.set("_changeIdBack", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            id_back: files,
            legal_id_back_img: ''
          }
        })
      }
    }
    handlePress = () => {
      this.setState({
        modal1: false
      }, () => {
        this.refs.picker.fileSelectorInput.removeAttribute('disabled')
      })
    }

    handleClick = (v: boolean, a, b, c) => {
      if (b == "remove") {
        this.setState({ modal1: false, modal1img: [] });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            modal1img: []
          }
        })
        this.refs.picker.fileSelectorInput.removeAttribute('disabled');
      } else {
        this.refs.picker.fileSelectorInput.setAttribute('disabled', true);
        this.setState({ modal1: true })
      }

    }

    onClose = key => () => {
      this.refs.picker.fileSelectorInput.removeAttribute('disabled')
      this.setState({
        [key]: false,
      });
    }

    /**银行卡正面选择 */
    changeBankFront = (files: any) => {
      // this.props.dispatch({
      //   type: 'submitQua/setQua',
      //   payload: {
      //     bank_front: files
      //   }
      // })
      Toast.loading('');
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide();
          let bank_card_front_img = res.data.path;
          Cookies.set("_changeBankFront", JSON.stringify(res.data.path), { expires: 1 });
          this.props.dispatch({
            type: 'submitQua/setQua',
            payload: {
              bank_front: files,
              bank_card_front_img
            }
          })
          const { bank_card_back_img } = this.props;
          if (bank_card_back_img && bank_card_front_img) {
            Toast.loading('识别中', 0)
            request({
              url: 'v3/bankcard',
              method: 'get',
              params: {
                bank_card_front_img
              }
            }).then(res => {
              console.log(res);
              let { data, code } = res;
              if (code == 200) {
                let str = data.bank_card_number;
                str = str.replace(/\s*/g, "");
                Toast.hide();
                Cookies.set("_handleBankNum", JSON.stringify(str), { expires: 1 });
                Cookies.set("_handleSettleBank", JSON.stringify(data.bank_name), { expires: 1 });
                this.props.dispatch({
                  type: 'submitQua/setQua',
                  payload: {
                    settle_bank_account_no: str,
                    settle_bank: data.bank_name
                  }
                });
                this.refs.bank3.inputRef.inputRef.setAttribute('disabled', true);
              } else {
                Toast.fail('银行卡识别失败，请重新上传。', 2);
                this.refs.bank3.inputRef.inputRef.removeAttribute('disabled');
              }
            }).catch(err => {
              Toast.fail('银行卡识别失败，请重新上传。', 2);
              this.refs.bank3.inputRef.inputRef.removeAttribute('disabled');
            })
          }

        });
      } else {
        Toast.hide();
        this.refs.bank3.inputRef.inputRef.removeAttribute('disabled');
        Cookies.set("_changeBankFront", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            bank_front: files,
            bank_card_front_img: ''
          }
        })
      }
    }
    /**银行卡反面选择 */
    changeBankBack = (files: any) => {
      // this.props.dispatch({
      //   type: 'submitQua/setQua',
      //   payload: {
      //     bank_back: files
      //   }
      // })
      Toast.loading('');
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide();
          let bank_card_back_img = res.data.path;
          Cookies.set("_changeBankBack", JSON.stringify(res.data.path), { expires: 1 });
          this.props.dispatch({
            type: 'submitQua/setQua',
            payload: {
              bank_back: files,
              bank_card_back_img
            }
          })
          const { bank_card_front_img } = this.props;
          if (bank_card_back_img && bank_card_front_img) {
            Toast.loading('识别中', 0)
            request({
              url: 'v3/bankcard',
              method: 'get',
              params: {
                bank_card_front_img
              }
            }).then(res => {
              let { data, code } = res;
              if (code == 200) {

                let str = data.bank_card_number;
                str = str.replace(/\s*/g, "");
                Toast.hide();
                Cookies.set("_handleBankNum", JSON.stringify(str), { expires: 1 });
                Cookies.set("_handleSettleBank", JSON.stringify(data.bank_name), { expires: 1 });
                this.props.dispatch({
                  type: 'submitQua/setQua',
                  payload: {
                    settle_bank_account_no: str,
                    settle_bank: data.bank_name
                  }
                });
                this.refs.bank3.inputRef.inputRef.setAttribute('disabled', true);
              } else {
                Toast.fail('银行卡识别失败，请重新上传。', 1);
                this.refs.bank3.inputRef.inputRef.removeAttribute('disabled');
              }
            }).catch(err => {
              this.refs.bank3.inputRef.inputRef.removeAttribute('disabled');
              Toast.fail('银行卡识别失败，请重新上传。', 1);
            })
          }
        });
      } else {
        Toast.hide();
        this.refs.bank3.inputRef.inputRef.removeAttribute('disabled');
        Cookies.set("_changeBankBack", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            bank_back: files,
            bank_card_back_img: ''
          }
        })
      }
    }
    /**营业执照选择 */
    changeLicense = (files: any) => {
      // this.props.dispatch({
      //   type: 'submitQua/setQua',
      //   payload: {
      //     license_img: files
      //   }
      // })
      Toast.loading('');
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide();
          let three_certs_in_one_img = res.data.path;
          Cookies.set("_changeLicense", JSON.stringify(res.data.path), { expires: 1 });
          this.props.dispatch({
            type: 'submitQua/setQua',
            payload: {
              license_img: files,
              three_certs_in_one_img
            }
          })
          Toast.loading('识别中', 0)
          request({
            url: 'v3/business_license',
            method: 'get',
            params: {
              business_license_img: three_certs_in_one_img
            }
          }).then(res => {

            let { data } = res;
            let corn_bus_name = data['单位名称'].words;
            let three_certs_in_one_no = data['社会信用代码'].words;
            let legal_name = data['法人'].words;
            let three_certs_in_one_valid_date = data['有效期'].words;
            Toast.hide();
            Cookies.set("_handleLicenseName", JSON.stringify(corn_bus_name), { expires: 1 });
            Cookies.set("_handleLicenseNUm", JSON.stringify(three_certs_in_one_no), { expires: 1 });
            Cookies.set("_handleLegalName", JSON.stringify(legal_name), { expires: 1 });
            Cookies.set("_three_certs_in_one_valid_date", JSON.stringify(three_certs_in_one_valid_date), { expires: 1 });
            this.props.dispatch({
              type: 'submitQua/setQua',
              payload: {
                corn_bus_name,
                three_certs_in_one_no,
                legal_name,
                three_certs_in_one_valid_date
              }
            })
          }).catch(err => {
            Toast.fail('识别失败', 1)
          })
        });
      } else {
        Toast.hide();
        Cookies.set("_changeLicense", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            license_img: files,
            three_certs_in_one_img: ''
          }
        })
      }
    }


    /**选择有效期 */
    chooseDate = (type: number) => () => {
      // this.setState({
      //   type,
      //   is_show: true,
      //   choose_date: date
      // })
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          type
        }
      })
      router.push('/submitQua/chooseDate')
    }
    /**初始化渲染图片的时候取消选择图片 */
    closeIDFront = () => {
      Cookies.set("_changeIdFront", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          legal_id_front_img: '',
          is_id_front: false,
        }
      })
    }
    closeIDBack = () => {
      Cookies.set("_changeIdBack", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          is_id_back: false,
          legal_id_back_img: ''
        }
      })
    }
    closeIDHand = () => {
      Cookies.set("_changeIdHand", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          is_id_hand: false,
          hand_hold_id_img: ''
        }
      })
    }
    closeBankFront = () => {
      Cookies.set("_changeBankFront", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          is_bank_front: false,
          bank_card_front_img: ''
        }
      })
    }
    closeBankBack = () => {
      Cookies.set("_changeBankBack", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          is_bank_back: false,
          bank_card_back_img: ''
        }
      })
    }
    closeLicense = () => {
      Cookies.set("_changeLicense", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'submitQua/setQua',
        payload: {
          is_license: false,
          three_certs_in_one_img: ''
        }
      })
    }

    /**保存或者提交 */
    submit = (type: number) => () => {
      if (this.state.bankShow) {
        Toast.fail('未选择支行', 1);
        return
      }
      const { legal_id_front_img, legal_id_back_img, hand_hold_id_img, contact_name, legal_id_no, date, bank_card_front_img, bank_card_back_img, three_certs_in_one_img, settle_bank_account_no, settle_bank_account_name, three_certs_in_one_valid_date, three_certs_in_one_no, corn_bus_name, legal_name, bank_name, settle_bank } = this.props;
      let data = {
        legal_id_back_img,
        legal_id_front_img,
        three_certs_in_one_img,
        hand_hold_id_img,
        bank_card_front_img,
        bank_card_back_img,
        contact_name,
        legal_id_valid_date: date,
        legal_id_no,
        settle_bank_account_no,
        settle_bank_account_name,
        three_certs_in_one_valid_date,
        three_certs_in_one_no,
        corn_bus_name,
        legal_name,
        bank_name,
        settle_bank,
        confirm_step: type
      }

      request({
        url: 'v3/payment_profiles',
        method: 'post',
        data
      }).then(res => {
        let { code, data } = res;
        if (code == 200) {
          if (type == 1) {
            Toast.success('保存成功', 2, () => {
              router.push('/review')
            })
          } else if (type == 2) {
            Toast.success('提交成功', 2, () => {
              router.push('/review')
            })
          }
        } else {
          Toast.fail(data)
        }
      })

    }
    selectImg = (files: any) => {
      Toast.loading('');
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide();
          let hand_hold_id_img = res.data.path;
          Cookies.set("_changeIdHand", JSON.stringify(res.data.path), { expires: 1 });
          this.props.dispatch({
            type: 'submitQua/setQua',
            payload: {
              hand_hold_id_img,
              modal1img: files
            }
          })
          const { legal_id_front_img, legal_id_back_img } = this.props;
          if (legal_id_back_img && legal_id_front_img && hand_hold_id_img) {
            Toast.loading('识别中', 0)
            request({
              url: 'v3/idcard',
              method: 'get',
              params: {
                idcard_back_img: legal_id_back_img,
                idcard_front_img: legal_id_front_img
              }
            }).then(res => {
              let { data } = res;
              let id = data.front.words_result['公民身份号码'].words
              let name = data.front.words_result['姓名'].words;
              let date = data.back.words_result['失效日期'].words;
              if (date != '长期') {
                date = moment(date).format("YYYY-MM-DD")
              }
              if (id && name) {
                Cookies.set("_handleName", JSON.stringify(name), { expires: 1 });
                Cookies.set("_legal_id_no", JSON.stringify(id), { expires: 1 });
                Cookies.set("_date", JSON.stringify(date), { expires: 1 });
                Toast.hide();
                this.props.dispatch({
                  type: 'submitQua/setQua',
                  payload: {
                    contact_name: name,
                    legal_id_no: id,
                    date
                  }
                })

              } else {
                Toast.fail('识别失败', 1);
              }
            }).catch(err => {
              Toast.fail('识别失败', 1)
            })
          }
        });
      } else {
        Toast.hide();
        Cookies.set("_changeIdHand", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'submitQua/setQua',
          payload: {
            hand_hold_id_img: '',
            modal1img: files
          }
        })
      }
      // this.props.dispatch({
      //   type: 'submitQua/setQua',
      //   payload: {
      //     modal1img: files
      //   }
      // })
      this.setState({
        modal1: false,
        modal1img: files
      }, () => {
        console.log(432)
        this.refs.picker.fileSelectorInput.removeAttribute('disabled');
      })

    }

    // handleAddImageClick = () => {
    //   this.setState({
    //     modal1 : false
    //   })
    // }

    onWrapTouchStart = (e) => {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target, '.am-modal-content');
      if (!pNode) {
        e.preventDefault();
      }
    }

    render() {
      const idFront = this.props.is_id_front == true ? (
        <div className={styles.idcard}><img src={"http://oss.tdianyi.com/" + this.props.legal_id_front_img} alt="" /><div className={styles.close} onClick={this.closeIDFront}>{''}</div></div>
      ) : (
          <ImagePicker
            className={styles.front_img}
            files={this.props.id_front}
            multiple={false}
            length={1}
            selectable={this.props.id_front.length < 1}
            onChange={this.changeIdFront}
          />
        );
      const idBack = this.props.is_id_back == true ? (
        <div className={styles.idcard}><img src={"http://oss.tdianyi.com/" + this.props.legal_id_back_img} /><div className={styles.close} onClick={this.closeIDBack}>{''}</div></div>
      ) : (
          <ImagePicker
            className={styles.back_img}
            files={this.props.id_back}
            multiple={false}
            length={1}
            selectable={this.props.id_back.length < 1}
            onChange={this.changeIdBack}
          />
        )
      const idHand = this.props.is_id_hand == true ? (
        <div className={styles.idcard}><img src={"http://oss.tdianyi.com/" + this.props.hand_hold_id_img} /><div className={styles.close} onClick={this.closeIDHand}>{''}</div></div>
      ) : (
          //809
          <ImagePicker
            files={this.props.modal1img}
            multiple={false}
            length={1}
            selectable={this.props.modal1img.length < 1}
            onChange={this.handleClick.bind(this, true)}
            onAddImageClick={this.handleClick.bind(this, true)}
            ref="picker"
          />
        )
      const bankFront = this.props.is_bank_front == true ? (
        <div className={styles.bankcard}><img src={"http://oss.tdianyi.com/" + this.props.bank_card_front_img} /><div className={styles.close} onClick={this.closeBankFront}>{''}</div></div>
      ) : (
          <ImagePicker
            className={styles.bank_front}
            files={this.props.bank_front}
            multiple={false}
            length={1}
            selectable={this.props.bank_front.length < 1}
            onChange={this.changeBankFront}
          />
        )
      const bankBack = this.props.is_bank_back == true ? (
        <div className={styles.bankcard}><img src={"http://oss.tdianyi.com/" + this.props.bank_card_back_img} /><div className={styles.close} onClick={this.closeBankBack}>{''}</div></div>
      ) : (
          <ImagePicker
            className={styles.bank_back}
            files={this.props.bank_back}
            multiple={false}
            length={1}
            selectable={this.props.bank_back.length < 1}
            onChange={this.changeBankBack}
          />
        )
      const License = this.props.is_license == true ? (
        <div className={styles.licenseImg}><img src={"http://oss.tdianyi.com/" + this.props.three_certs_in_one_img} /><div className={styles.close} onClick={this.closeLicense}>{''}</div></div>
      ) : (
          <ImagePicker
            className={styles.license}
            files={this.props.license_img}
            multiple={false}
            length={1}
            selectable={this.props.license_img.length < 1}
            onChange={this.changeLicense}
          />
        )

      // const chooseTime = this.state.is_show == true ? (<ChooseDate type={this.state.type} choose_date={this.state.choose_date} onChange={this.timeChange}/>) : ('');




      return (
        <div style={{ width: '100%', height: 'auto', background: '#fff' }} id="box0" className={styles.submitQua}>
          <div>
            <WingBlank>
              <Flex className={styles.sfz_title}>
                <div className={styles.sfz_left}>身份证</div>
                <div className={styles.sfz_right} onClick={this.toIdCardExample}>查看示例</div>
              </Flex>
              <Flex style={{ marginTop: '23px' }}>请上传经营者身份证</Flex>
              <Flex className={styles.sfz_img}>
                {idFront}
                {idBack}
                {idHand}
              </Flex>
              <Modal
                className={styles.id_modal}
                visible={this.state.modal1}
                transparent
                maskClosable={true}
                onClose={this.onClose('modal1')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
              // footer={[{ text: '知道了', onPress: this.handlePress }]}
              >
                <div style={{ height: "5.625rem" }}>
                  <div style={{ width: "100%", paddingBottom: "0", height: "auto" }}>
                    <img style={{ height: "100%", width: "100%" }} src={require('./model.png')} />
                  </div>
                  <div style={{ width: "100%", position: "relative" }}>
                    <div style={{ width: "100%", lineHeight: "1", paddingTop: "0.3rem", color: "#21418a", fontSize: "0.3rem", textAlign: "center" }}>知道了</div>
                    <div className={styles.imgpickerBox} >
                      <ImagePicker
                        multiple={false}
                        length={1}
                        onChange={this.selectImg}
                      // onAddImageClick={this.handleAddImageClick}
                      />
                    </div>
                  </div>
                </div>

              </Modal>
              <List>
                <InputItem placeholder='请输入姓名' value={this.props.contact_name} onChange={this.handleName}>姓名</InputItem>
                <InputItem placeholder='请输入身份证号' onChange={this.handleID} value={this.props.legal_id_no}>身份证号</InputItem>
                <InputItem
                  placeholder='请选择身份证有效期'
                  editable={false}
                  value={this.props.date}
                  onClick={this.chooseDate(1)}
                >
                  有效期
                  <Icon
                    type='right'
                    className={styles.youxiao}
                  />
                </InputItem>
              </List>
              <Flex className={styles.bank_title}>
                <div className={styles.sfz_left}>银行卡认证</div>
                <div className={styles.sfz_right} onClick={this.toBankExample}>查看示例</div>
              </Flex>
              <Flex className={styles.bank_img}>
                {bankFront}
                {bankBack}
              </Flex>
              <div className={styles.bank_toast}>温馨提示：1.请上传清晰的图片，银行卡号不可遮蔽。2.暂不支持部分银行卡。</div>
              <List>
                <InputItem ref="bank1" placeholder='请输入开户人姓名' onChange={this.handleBankAccountName} value={this.props.settle_bank_account_name}>开户人</InputItem>
                <InputItem ref="bank2" placeholder='经营者银行卡（仅限储蓄卡）' value={this.props.settle_bank_account_no} onChange={this.handleBankNum}>银行卡号</InputItem>
                <InputItem ref="bank3" placeholder='开户银行' value={this.props.settle_bank} onChange={this.handleSettleBank}>开户行</InputItem>
                <InputItem ref="bank4" placeholder='请输入支行' id="box1" value={this.props.bank_name} onChange={this.handleBankName}>支行</InputItem>

                {/* <div style={{ width: "100%", height: "1px", position: "relative", display: this.state.bankShow ? "block" : "none" }}>
                  <div style={{ width: "100%", height: "auto", background: "#fff", border: "1px solid #000", position: "absolute", zIndex: 4, top: "0px", padding: "48px", boxSizing: "border-box", color: "#000" }}>
                    <ul style={{ display: "flex", flexDirection: "column", padding: "0", margin: "0", listStyle: "none" }}>
                      {
                        this.state.bankList.map((item, index) => {
                          return (
                            <li key={item} style={{ borderBottom: "1px #000 solid", width: "100%", height: "auto", lineHeight: "60px", padding: "20px 0" }} onClick={(e) => {
                              this.setState({ bankShow: false })
                              Cookies.set("_handleBankName", JSON.stringify(e.target.innerText), { expires: 1 });
                              this.props.dispatch({
                                type: 'submitQua/setQua',
                                payload: {
                                  bank_name: e.target.innerText
                                }
                              })
                            }} >{item}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div> */}
              </List>
              <Flex className={styles.bank_title}>
                <div className={styles.sfz_left}>营业执照</div>
                <div className={styles.sfz_right} onClick={this.toLicenseExample}>查看示例</div>
              </Flex>
              <Flex className={styles.license_img}>
                {License}
              </Flex>
              <InputItem placeholder='同统一社会信用代码' value={this.props.three_certs_in_one_no} onChange={this.handleLicenseNUm}>注册号</InputItem>
              <InputItem placeholder='无执照名称可填写经营者名称' value={this.props.corn_bus_name} onChange={this.handleLicenseName}>执照名称</InputItem>
              <InputItem placeholder='请输入法人姓名' value={this.props.legal_name} onChange={this.handleLegalName}>法人姓名</InputItem>
              <InputItem placeholder='有效期' editable={false} value={this.props.three_certs_in_one_valid_date} onClick={this.chooseDate(2)}>有效期<Icon type='right' className={styles.youxiao} /></InputItem>
            </WingBlank>
            <Flex className={styles.buttons}>
              <div className={styles.save} onClick={this.submit(1)}>保存</div>
              <div className={styles.submit} onClick={this.submit(2)}>提交审核</div>
            </Flex>
          </div>
        </div>
      )
    }
  }

)
