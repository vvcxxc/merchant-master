/**
 * title: 参与活动
 */
import React, { Component } from 'react'
import { List, InputItem, Toast, ImagePicker } from 'antd-mobile';
import { connect } from 'dva';
import InputBox from './components/inputBox'//输入框
import InputUpdateBox from './components/updateInput'
import AttendRules from './components/attendRules'//参与规则
import UploadPictures from './components/active_img'
import ShowList from './components/showList'
import request from '@/services/request';
import router from 'umi/router';
import upload from '@/services/oss';
import styles from './index.less'


export default connect(({ participateActive }: any) => participateActive)(
  class participateActivities extends Component<any> {

    state = {
      coupons_type: 1,//设置活动图片
      rules: [],
      inputList: {},
      cover_img: '',
      submit: false,
      cover_image: '',
      again: false,
      update: false,
      showList: 1,
      bigImg: '',
      is_model:false
    }
    componentDidMount() {
      const { look, youhui_id } = this.props.location.query
      if (look) {
        this.userGetData()
      } else {
        youhui_id ? this.updateListData() : this.addListData()
      }
    }

    //请求列表数据 -添加活动
    addListData = () => {

      request({
        url: 'api/merchant/youhui/addCardVoucherActivity',
        method: 'get',
        params: {
          recruit_activity_id: this.props.location.query.recruit_activity_id
        }
      }).then((res) => {
        const { code, data } = res
        this.setState({
          rules: data.rules,
          inputList: data,
          bigImg: data.cover_image,
          cover_image: this.props.shop.image_url && this.props.shop.image_url.length ? this.props.shop.image_url : '',
          coupons_type: this.props.coupons_type
        })
      })
    }

    //请求列表数据 -编辑活动
    updateListData = () => {
      request({
        url: 'api/merchant/youhui/editCardVoucherActivity',
        method: 'get',
        params: {
          recruit_activity_id: this.props.location.query.recruit_activity_id,
          youhui_id: this.props.location.query.youhui_id
        }
      }).then((res) => {
        const { code, data } = res
         this.props.dispatch({
          type: 'participateActive/setUpdateShop',
          payload: {
            image_url: data.image,
            image: data.image
          }
        });
        this.setState({
          coupons_type: data.youhui_type,
          inputList: data,
          rules: data.rules,
          bigImg: data.cover_image,
          cover_image://如果缓存里面有，就用缓存的，如果没有，就用后台返回的
            this.props.updateShop.image_url&& this.props.updateShop.image_url.length ? this.props.updateShop.image_url : data.image,//
          update: true,
          listImg: data.image,
        })
      })

      const { coupons_type } = this.props
      coupons_type && this.setState({ coupons_type })
    }

    // 卡券类型切换
    onChangeType = (coupons_type: boolean) => {
      this.setState({ coupons_type })
    }


    uploadImg = (cover_image: string) => {
      this.setState({ cover_image })
      //判断 处于什么条件下， 给图片赋值

      if (!this.state.update) {
        this.props.dispatch({
          type: 'participateActive/setShop',
          payload: {
            image_url: cover_image
          }
        });
      } else {//添加页面

        this.props.dispatch({
          type: 'participateActive/setUpdateShop',
          payload: {
            image_url: cover_image,
            image: cover_image
          }
        });
      }
    }

    //请求浏览数据
   userGetData = () => {
      request({
        url: 'api/merchant/youhui/cardVoucherActivityInfo',
        method: 'get',
        params: {
          youhui_id: this.props.location.query.youhui_id,
          recruit_activity_id: this.props.location.query.recruit_activity_id,
        }
      }).then((res) => {
        const { code, data, message } = res
        if (code === 200) {
          this.setState({ inputList: data, bigImg: data.activity_img})
        } else {
          Toast.fail(message)
        }

      })
    }

    render() {
      const { coupons_type, rules, submit, cover_image, inputList, again, update, bigImg, is_model} = this.state
      const { query } = this.props.location

      const Model = (
        <div className={styles.model}>
          <div className={styles.model_main}>
            <img onClick={() => this.setState({ is_model: false})} src={require('../../../assets/quxiao.png')} alt="" />
            <div className={styles.model_title}>
              温馨提示
               </div>
            <div className={styles.model_text}>重新提交后，需要再次审核</div>
            <div className={styles.model_bottom} onClick={() => this.setState({ is_model: false, again: true })}>确定</div>
          </div>
        </div>
      )

      return (
        <div className={styles.participateActivities}>
          { is_model && Model}
          <div className={styles.activity_big_img}>
            <img src={'http://oss.tdianyi.com/' + bigImg} alt="" />
          </div>
          {
            query.look && inputList && Object.keys(inputList).length? <ShowList list={inputList}/>:null
          }
          {
            !query.look && query.youhui_id && inputList && Object.keys(inputList).length ?
            <InputUpdateBox
              again={this.state.again}
              list={inputList}
                listImg={this.state.cover_image}
                recruit_activity_id={this.props.location.query.recruit_activity_id}
              submit={() => { this.setState({ again: false }) }}
            />:null
          }
          {
            !query.look && !query.youhui_id && inputList &&Object.keys(inputList).length?
            <InputBox onChangeType={this.onChangeType}
              list={inputList}
              sumbit={submit}
                cover_image={cover_image}
                recruit_activity_id={this.props.location.query.recruit_activity_id}
              submit={() => { this.setState({ submit: false }) }}
            />:null
          }

          {
            !coupons_type && !query.look ?
              <UploadPictures
                update={update}
                listImg={this.state.cover_image}
                uploadImg={this.uploadImg}
              />:null
          }
          {
            !query.look ? <AttendRules data={rules} />:null
          }

          {
            query.look?
            <div className={styles.foot} style={{marginTop:'0.4rem'}}>
              <span onClick={() => { router.goBack() }}>返回卡券列表</span>
              </div> : <div className={styles.foot}>
                {
                  query.youhui_id ?
                    <span onClick={() => { this.setState({ is_model: true }) }}>重新提交</span> : <span onClick={() => { this.setState({ submit: true }) }}>提交活动</span>
                }
                <span onClick={()=>router.goBack()}>取消</span>
              </div>
          }
          {

          }
        </div>
      )
    }
  })
