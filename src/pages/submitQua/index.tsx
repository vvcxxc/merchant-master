/**
 * 提交资质
 */
import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, ImagePicker, List, InputItem, Icon, ActivityIndicator, Toast } from 'antd-mobile';
import router from 'umi/router';
import upload from '@/services/oss';
import request from '@/services/request';
import ChooseDate from './couponents/chooseDate/chooseDate'

export default class submitQua extends Component {
  state = {
    /**身份证识别中 */
    animating_id: false,
    /**身份证反面照 */
    id_back: [],
    /**身份证正面照 */
    id_front: [],
    /**手持身份证照 */
    id_hand: [],
    /**有效期 */
    date: '2019-01-01',
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
    /**身份证号有效期 */
    legal_id_valid_date: '',
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
    three_certs_in_one_valid_date: '2019-04-22',
    /**选择有效期子组件判断是为身份证还是营业执照 */
    type: 1,
    /**控制子组件的显示和隐藏 */
    is_show: false



  };
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
  handleName = (e : any) => {
    this.setState({
      contact_name: e
    })
  }
  /**身份证号输入 */
  handleID = (e : any) => {
    this.setState({
      legal_id_no: e
    })
  }
  /**开户人 */
  handleBankAccountName = (e : any) => {
    this.setState({
      settle_bank_account_name: e
    })
  }
  /**银行卡号 */
  handleBankNum = (e: any) => {
    this.setState({settle_bank_account_no: e})
  }
  /**开户银行 */
  handleSettleBank = (e: any) => {
    this.setState({settle_bank: e})
  }
  /**支行 */
  handleBankName = (e: any) => {
    this.setState({bank_name: e})
  }
  /**注册号 */
  handleBankNUm = (e: any) => {
    this.setState({three_certs_in_one_no: e})
  }
  /**执照名称 */
  handleLicenseName = (e: any) => {
    this.setState({corn_bus_name: e})
  }
  /**法人名称 */
  handleLegalName = (e: any) => {
    this.setState({legal_name: e})
  }



  /**身份证正面照选择 */
  changeIdFront = ( files: any ) => {
    this.setState({
      id_front: files,
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let legal_id_front_img = res.data.path;
        this.setState({legal_id_front_img});
        const {legal_id_back_img} = this.state;
        if(legal_id_back_img&&legal_id_front_img){
          this.setState({animating_id: !this.state.animating_id})
          request({
            url: 'v3/idcard',
            method: 'get',
            params: {
              idcard_back_img: legal_id_back_img,
              idcard_front_img: legal_id_front_img
            }
          }).then(res => {
            let {data} = res;
            let id = data.front.words_result['公民身份号码'].words
            let name = data.front.words_result['姓名'].words;
            this.setState({animating_id: !this.state.animating_id})
            if(id && name){
              this.setState({
                contact_name: name,
                legal_id_no: id
              })
            }else{
              Toast.fail('识别失败', 1);
            }
          })
        }
      });
    }else {
      this.setState({legal_id_front_img: ''})
    }
  }
  /**身份证反面选择 */
  changeIdBack = ( files: any ) => {
    this.setState({
      id_back: files,
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let legal_id_back_img = res.data.path;
        this.setState({legal_id_back_img});
        const {legal_id_front_img} = this.state;
        if(legal_id_back_img&&legal_id_front_img){
          this.setState({animating_id: !this.state.animating_id})
          request({
            url: 'v3/idcard',
            method: 'get',
            params: {
              idcard_back_img: legal_id_back_img,
              idcard_front_img: legal_id_front_img
            }
          }).then(res => {
            let {data} = res;
            let id = data.front.words_result['公民身份号码'].words
            let name = data.front.words_result['姓名'].words;
            this.setState({animating_id: !this.state.animating_id})
            if(id && name){
              this.setState({
                contact_name: name,
                legal_id_no: id
              })
            }else{
              Toast.fail('识别失败', 1);
            }
          })
        }
      });
    }else {
      this.setState({legal_id_back_img: ''})
    }
  }
  /**手持身份证照选择 */
  changeIdHand = ( files: any ) => {
    this.setState({
      id_hand: files,
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let hand_hold_id_img = res.data.path;
        this.setState({hand_hold_id_img});
      });
    }else {
      this.setState({hand_hold_id_img: ''})
    }
  }
  /**银行卡正面选择 */
  changeBankFront = ( files: any ) => {
    this.setState({
      bank_front: files,
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let bank_card_front_img = res.data.path;
        this.setState({bank_card_front_img});
        this.setState({animating_id: !this.state.animating_id})
        request({
          url: 'v3/bankcard',
          method: 'get',
          params:{
            bank_card_front_img
          }
        }).then(res => {
          this.setState({animating_id: !this.state.animating_id})
          let {data, code} = res;
          if(code == 200){
             this.setState({
              settle_bank_account_no: data.bank_card_number,
              settle_bank: data.bank_name
            })
          }else{
            Toast.fail('识别失败', 1);
          }

        })
      });
    }else {
      this.setState({bank_card_front_img: ''})
    }
  }
  /**银行卡反面选择 */
  changeBankBack = ( files: any ) => {
    this.setState({
      bank_back: files,
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let bank_card_back_img = res.data.path;
        this.setState({bank_card_back_img});
      });
    }else {
      this.setState({bank_card_back_img: ''})
    }
  }
  /**营业执照选择 */
  changeLicense = ( files: any ) => {
    this.setState({
      license_img: files,
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let three_certs_in_one_img = res.data.path;
        this.setState({three_certs_in_one_img});
        this.setState({animating_id: !this.state.animating_id})
        request({
          url: 'v3/business_license',
          method: 'get',
          params: {
            business_license_img: three_certs_in_one_img
          }
        }).then(res => {
          this.setState({animating_id: !this.state.animating_id});
          let {data} = res;
          let corn_bus_name = data['单位名称'].words;
          let three_certs_in_one_no = data['社会信用代码'].words;
          let legal_name = data['法人'].words;
          let three_certs_in_one_valid_date = data['有效期'].words;
          this.setState({
            corn_bus_name,
            three_certs_in_one_no,
            legal_name,
            three_certs_in_one_valid_date
          })

        })
      });
    }else {
      this.setState({three_certs_in_one_img: ''})
    }
  }


  /**选择有效期 */
  chooseDate = (type: number) => {
    this.setState({
      type,
      is_show: true
    })

  }




  render (){
    const Choosetime = this.state.is_show == true ? (<ChooseDate/>) : null;

    const { id_hand, id_back, id_front, bank_front, bank_back, license_img } = this.state;
    return (
      <div style={{ width: '100%', height: 'auto', background: '#fff' }}>
        <WingBlank>
          <Flex className={styles.sfz_title}>
            <div className={styles.sfz_left}>身份证</div>
            <div className={styles.sfz_right} onClick={this.toIdCardExample}>查看示例</div>
          </Flex>
          <Flex style={{ marginTop: '23px'}}>请上传经营者身份证</Flex>
          <Flex className={styles.sfz_img}>
            <ImagePicker
              className={styles.front_img}
              files={id_front}
              multiple={false}
              length={1}
              selectable={id_front.length < 1}
              onChange={this.changeIdFront}
            />
            <ImagePicker
              className={styles.back_img}
              files={id_back}
              multiple={false}
              length={1}
              selectable={id_back.length < 1}
              onChange={this.changeIdBack}
            />
            <ImagePicker
              className={styles.hand_img}
              files={id_hand}
              multiple={false}
              length={1}
              selectable={id_hand.length < 1}
              onChange={this.changeIdHand}
            />
          </Flex>
          <List>
            <InputItem placeholder='请输入姓名' value={this.state.contact_name} onChange={this.handleName}>姓名</InputItem>
            <InputItem placeholder='请输入身份证号' onChange={this.handleID} value={this.state.legal_id_no}>身份证号</InputItem>
            <InputItem
              placeholder='请选择身份证有效期'
              editable={false}
              value={this.state.date}
              onClick={this.chooseDate}
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
          <ImagePicker
              className={styles.bank_front}
              files={bank_front}
              multiple={false}
              length={1}
              selectable={bank_front.length < 1}
              onChange={this.changeBankFront}
          />
          <ImagePicker
            className={styles.bank_front}
            files={bank_back}
            multiple={false}
            length={1}
            selectable={bank_back.length < 1}
            onChange={this.changeBankBack}
          />
          </Flex>
          <List>
            <InputItem placeholder='请输入开户人姓名' onChange={this.handleBankAccountName} value={this.state.settle_bank_account_name}>开户人</InputItem>
            <InputItem placeholder='经营者银行卡（仅限储蓄卡）' value={this.state.settle_bank_account_no} onChange={this.handleBankNUm} >银行卡号</InputItem>
            <InputItem placeholder='选择开户银行' editable={false} value={this.state.settle_bank} onChange={this.handleSettleBank}>开户行<Icon type='right' className={styles.youxiao}/></InputItem>
            <InputItem placeholder='请输入支行' value={this.state.bank_name} onChange={this.handleBankName}>支行</InputItem>
          </List>
          <Flex className={styles.bank_title}>
            <div className={styles.sfz_left}>营业执照</div>
            <div className={styles.sfz_right} onClick={this.toLicenseExample}>查看示例</div>
          </Flex>
          <Flex className={styles.license_img}>
          <ImagePicker
            className={styles.license}
            files={license_img}
            multiple={false}
            length={1}
            selectable={license_img.length < 1}
            onChange={this.changeLicense}
          />
          </Flex>
          <InputItem placeholder='同统一社会信用代码' value={this.state.three_certs_in_one_no} onChange={this.handleBankNUm}>注册号</InputItem>
          <InputItem placeholder='无执照名称可填写经营者名称' value={this.state.corn_bus_name} onChange={this.handleLicenseName}>执照名称</InputItem>
          <InputItem placeholder='请输入法人姓名' value={this.state.legal_name} onChange={this.handleLegalName}>法人姓名</InputItem>
          <InputItem placeholder='有效期' editable={false} value={this.state.three_certs_in_one_valid_date}>有效期<Icon type='right' className={styles.youxiao}/></InputItem>
        </WingBlank>
        <ActivityIndicator toast={true} text='识别中...' animating={this.state.animating_id}/>
        <Flex className={styles.buttons}>
          <div className={styles.save}>保存</div>
          <div className={styles.submit}>提交审核</div>
        </Flex>
        {Choosetime}
      </div>
    )
  }
}
