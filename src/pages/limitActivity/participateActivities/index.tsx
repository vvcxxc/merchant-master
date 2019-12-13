/**
 * title: 参与活动
 */
import React, { Component } from 'react'
import { List, InputItem, Toast } from 'antd-mobile';
import { connect } from 'dva';
import InputBox from './components/inputBox'//输入框
import AttendRules from './components/attendRules'//参与规则
import UploadPictures from './components/active_img'
import request from '@/services/request';
import router from 'umi/router';
import styles from './index.less'


export default connect(({ participateActive }: any) => participateActive)(
  class participateActivities extends Component<any> {

    state = {
      cardVoucherType: false,//设置活动图片
      rules: [],
      start_date: '',
      end_date:'',
      listImg: '',
      submit:false
    }

    componentDidMount() {
      
      
      if (this.props.location.query.youhui_id) {
        this.updateListData()
      } else {
        this.addListData()
      }

    }

    //添加数据 
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
          start_date: data.start_date,
          end_date: data.end_date,
          listImg: data.cover_image
        })
      })

      const { cardVoucherType } = this.props
      cardVoucherType && this.setState({ cardVoucherType })
    }

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
        console.log(data,'data');
        
        // this.setState({
        //   rules: data.rules,
        //   start_date: data.start_date,
        //   end_date: data.end_date,
        //   listImg: data.cover_image
        // })
      })

      const { cardVoucherType } = this.props
      cardVoucherType && this.setState({ cardVoucherType })
    }

    // 卡券类型切换
    onChangeType = (cardVoucherType: boolean) => {
      this.setState({ cardVoucherType })
    }

    //提交活动 现金false 商品true
    submitActive = () => {
      const { cardVoucherType } = this.state
      switch (cardVoucherType) {
        case false:
          this.props.dispatch({
            type: 'participateActive/clearCash'
          });
          break;
        default:
          this.props.dispatch({
            type: 'participateActive/clearShop'
          }
           );
          this.props.dispatch({
            type: 'participateActive/setActiveType',
            payload:false
          });
          break;
      }
      this.setState({ submit: true })
      // router.push({ pathname: '/limitActivity/activityList' })
    }

   

    render() {
      const { cardVoucherType, rules, start_date, end_date, listImg,submit } = this.state
      return (
        <div className={styles.participateActivities}>

          <div className={styles.activity_big_img}>
            <img src={'https://t11.baidu.com/it/u=1335957622,2671955539&fm=76'} alt="" />
          </div>
          <InputBox onChangeType={this.onChangeType}
            start_date={start_date} end_date={end_date}
            sumbit={submit}
          ></InputBox>
          {
            cardVoucherType ? <div className={styles.set_prompt}>{'*请上传横行的图片，建议图片比例16:9'}</div> : null
          }
          {
            cardVoucherType ? <UploadPictures listImg={listImg}/> : null
          }
          <AttendRules data={rules}/>

          <div className={styles.foot}>
            <span onClick={this.submitActive}>提交活动</span>
            <span>取消</span>
          </div>

        </div>
      )
    }
  })