import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
interface Props {
  showDeleteActivity: (data: Object) => void,
  show: boolean,
  coupon: couponType,
  coupon_id: number,
  query_id:number
}

interface couponType {
  activity_id: number,
  length:number
}
export default class DeleteActivity extends Component<Props> {

  state = {
    show: false
  }

  shouldComponentUpdate(newData: any, oldData: any) {
    if (newData.show !== oldData.show && newData.show) {
      this.setState({ show: true })
    }
    return true
  }

  onclose = () => {
    this.props.showDeleteActivity({})
    this.setState({show:false})
  }

  onDetermine = () => {
    if (this.props.coupon.length < 2) {
      this.handleDelete()
      return
    }
    this.props.showDeleteActivity({})
    this.setState({ show: false })
    request({
      url: 'v3/return_coupons_grade',
      method: 'delete',
      params: {
        activity_id: this.props.coupon.activity_id,
        coupon_id: this.props.coupon_id
      }
    })
      .then((res) => {
        if (res.code == 200) {
          Toast.success('删除成功', 1000)
          setTimeout(() => {
            history.go(0)
          }, 1000);
        }
      })
  }

  handleDelete = async () => {
    Toast.loading('');
    const res = await request({ url: 'v3/return_coupons/' + this.props.query_id, method: 'delete' });
    Toast.hide();
    if (res.code === 200) {
      Toast.success('删除成功');
      setTimeout(router.goBack, 1000);
    }
  };

  render() {
    const { show } = this.state
    return (
      <div className={styles.deleteActive} style={{
        zIndex:show?10:-10
      }}>
        <div className={styles.deleteContent}>
          {
            this.props.coupon.length < 2 ? <div className={styles.prompt_two}>
              <div>删除最后一项优惠条件</div>
              <div className={styles.prompt_bottom}>活动也将结束</div>
            </div> : <div className={styles.prompt}>确认删除该项优惠条件</div> 
          }
          <div className={styles.operation}>
            <div className={styles.left} onClick={this.onclose}>取消</div>
            <div className={styles.right} style={{
              backgroundColor: 'rgba(33,65,138,1)',
              color: 'rgba(255,255,255,1)'
            }} onClick={this.onDetermine}>确认</div>
          </div>
        </div>
      </div>
    )
  }
}