import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, List, InputItem, ImagePicker, Button, ActivityIndicator, Toast } from 'antd-mobile';
import upload from '@/services/oss';
import request from '@/services/request';
import router from 'umi/router';


export default class ChangeBank extends Component {
  state = {
    /**持卡人姓名 */
    bank_user: '',
    /**银行名字 */
    bank_name: '',
    /**开户行支行 */
    subbranch: '',
    /**验证码 */
    verification: '',
    /**银行卡号 */
    bank_info: '',
    /**银行卡正面 */
    bank_card_front_img: '',
    /**银行卡反面 */
    bank_card_back_img: '',
    /**银行卡正面base64 */
    bank_front: [],
    /**银行卡反面base64 */
    bank_back: [],
    animating_id: false,
    /**验证码 */
    is_ok: true,
    wait: '',
    //旧数据 用户以前的银行卡照片
    card_front: '',
    card_back:''
  };
  /**
   * 改变值
  */
  componentDidMount() {
    // request()'api/merchant/staff/userBankinfo'
    request({
      url: 'api/merchant/staff/userBankInfo',
      method: 'get'
    }).then(res => { 
      const { data } = res
      this.setState({
        bank_user: data.bank_user,
        bank_name: data.bank_name,
        subbranch: data.subbranch,
        bank_card_front_img: data.bank_card_front_img.split('http://oss.tdianyi.com/')[1],
        bank_card_back_img: data.bank_card_back_img.split('http://oss.tdianyi.com/')[1],
        bank_info: data.bank_info,
        card_front: data.bank_card_front_img.split('http://oss.tdianyi.com/')[1],
        card_back:data.bank_card_back_img.split('http://oss.tdianyi.com/')[1]
        // bank_front: [data.bank_card_back_img]
      })
    })
  }
  handleUser = (e: any) => {
    this.setState({bank_user: e})
  }
  handleName = (e: any) => {
    this.setState({bank_name: e})
  }
  handleSubbranch = (e: any) => {
    this.setState({subbranch: e})
  }
  handleCode = (e: any) => {
    this.setState({verification: e})
  }
  handleInfo = (e: any) => {
    this.setState({bank_info: e})
  }

  /**上传图片 */
  changeFront = ( files: any ) => {
    this.setState({bank_front: files});
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let { data } = res;
        this.setState({bank_card_front_img: data.path});
        let { bank_card_back_img } = this.state;
        let bank_card_front_img = data.path;
        if (bank_card_back_img&&bank_card_front_img){
          // this.setState({animating_id: !this.state.animating_id})
          Toast.loading('识别中')
          request({
            url: 'v3/bankcard',
            method: 'get',
            params: {
              bank_card_front_img
            }
          }).then(res =>{
            // this.setState({animating_id: !this.state.animating_id});
            let {data, code} = res;
            if(code == 200){
              Toast.hide()
              let str = data.bank_card_number;
              str = str.replace(/\s*/g,"");
              this.setState({
                bank_info: str,
                bank_name: data.bank_name
              })
            }else{
              Toast.fail('识别失败，请手动输入', 1);
            }
          })
        }
      })
    }else{
      this.setState({bank_card_front_img: ''})
    }
  }

  changeBack = ( files: any ) => {
    this.setState({bank_back: files});
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let { data } = res;
        this.setState({bank_card_back_img: data.path})
        let bank_card_back_img = data.path;
        let { bank_card_front_img } = this.state
        if (bank_card_back_img&&bank_card_front_img){
          // this.setState({animating_id: !this.state.animating_id});
          Toast.loading('识别中')
          request({
            url: 'v3/bankcard',
            method: 'get',
            params: {
              bank_card_front_img
            }
          }).then(res =>{
            // this.setState({animating_id: !this.state.animating_id});
            let {data, code} = res;
            if(code == 200){
              Toast.hide()
              let str = data.bank_card_number;
              str = str.replace(/\s*/g,"");
              this.setState({
                bank_info: str,
                bank_name: data.bank_name
              })
            }else{
              Toast.fail('识别失败,请手动输入', 1);
            }
          })
        }
      })
    }else{
      this.setState({bank_card_back_img: ''})
    }
  }

  /**
   * 获取验证码
   */
  getCode = () => {
    let wait = 60;
      request({
        url: 'api/merchant/staff/getVerification',
        method: 'post',
      }).then(res => {
        let { code } = res;
        if ( code == 200 ){
          Toast.success('已发送，请注意查收',1)
          let timer = setInterval(()=>{
            if( wait == 0){
              this.setState({ is_ok: true });
              clearInterval(timer)
            }else{
              wait --;
              this.setState({ is_ok: false , wait});
              clearInterval();
            }
          }, 1000);
        } else {
          Toast.fail('当日获取验证码次数已达上限，请明日重试', 1);
        }
      }).catch(res => {
        Toast.fail('当日获取验证码次数已达上限，请明日重试',1);
      })
  }

  /**更新 */
  update = () => {
    // console.log(this.state.bank_front,'898989');
    
    let { bank_user, bank_name, subbranch, verification, bank_info, bank_card_front_img, bank_card_back_img } = this.state;
    request({
      url: 'api/merchant/staff/add/bank',
      method: 'post',
      data: {
        bank_user,
        bank_name,
        subbranch,
        verification,
        bank_card_front_img,
        bank_card_back_img,
        bank_info
      }
    }).then(res => {
      let { code, message } = res;
      if (code == 200){
        Toast.success(message,1,() => {
          router.goBack()
        })
      }else{
        Toast.fail(message,2)
      }
    })
  }

  card_img_box = (e:any) => {
    
  }

  //删除旧数据 的两张图片
  deleteCardFront = () => {
    this.setState({
      card_front: '',
      bank_card_front_img:''
    })
  }

  deleteCard_back = () => {
    this.setState({
      card_back: '',
      bank_card_back_img:''
    })
  }


  render (){
    const button =
      this.state.is_ok === true ? (
        <div className={styles.sendCode} onClick={this.getCode}>发送验证码</div>
      ) : (
        <div className={styles.doneSend}>{this.state.wait}秒</div>
      );
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
       
        <WingBlank>
          <Flex className={styles.title}>银行卡认证</Flex>
          <Flex className={styles.bank_img}>
            <div className={styles.card_img_box}>
              {
                this.state.card_front ? <div className={styles.img_box}>
                  <div className={styles.border_error} onClick={this.deleteCardFront}>
                    <img src={require('../../../../assets/error.png')} alt="" /></div>
                  <img src={'http://oss.tdianyi.com/' + this.state.card_front} alt=""  /> 
                </div>: null
              }
              <ImagePicker
                className={styles.bank_front}
                multiple={false}
                length={1}
                selectable={this.state.bank_front.length < 1}
                files={this.state.bank_front}
                onChange={this.changeFront}
              />
              
            </div>
            <div className={styles.card_img_box} >
              {
                this.state.card_back ? <div className={styles.img_box}> 
                  <div onClick={this.deleteCard_back} className={styles.border_error}><img src={require('../../../../assets/error.png')} alt="" /></div>
                  <img src={'http://oss.tdianyi.com/' + this.state.card_back} alt="" />
                </div> : null
              }
            <ImagePicker
              className={styles.bank_back}
              multiple={false}
              length={1}
              selectable={this.state.bank_back.length < 1}
              files={this.state.bank_back}
              onChange={this.changeBack}
            />
            </div>
          </Flex>
          <List className={styles.input_box}>
            <InputItem placeholder='请输入开户人姓名' value={this.state.bank_user} onChange={this.handleUser}>开户人</InputItem>
            <InputItem placeholder='经营者银行卡（仅限储蓄卡）' value={this.state.bank_info} onChange={this.handleInfo} type={'digit'}>银行卡号</InputItem>
            <InputItem placeholder='请选择开户银行（例如：招商银行）' value={this.state.bank_name} onChange={this.handleName}>开户银行</InputItem>
            <InputItem placeholder='请输入验证码' value={this.state.verification} onChange={this.handleCode}>验证码{button}</InputItem>
            <InputItem placeholder='请输入支行地址' value={this.state.subbranch} onChange={this.handleSubbranch}>支行</InputItem>
          </List>
          <Button type="primary" style={{ marginTop: 115 }} className={styles.button} onClick={this.update}>
            确认更新
          </Button>
        </WingBlank>
        {/* <ActivityIndicator toast={true} text='识别中...' animating={this.state.animating_id}/> */}
      </div>
    )
  }
}
