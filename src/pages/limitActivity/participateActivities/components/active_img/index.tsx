import React, { Component } from 'react'
import { ImagePicker, Toast } from 'antd-mobile';
import upload from '@/services/oss';
import { connect } from 'dva';
import styles from './index.less'

export default connect(({ participateActive }: any) => participateActive)(
 class ActiveImg extends Component<any> {

  state = {
    imgUrl:[]
    }
    componentDidMount() {
      if (this.props.imgUrl && this.props.imgUrl.length) this.setState({...this.props})
    }

  //此函数负责 显示 上传 删除 
  uploadImage = () => (files: any[], operationType: string, index?: number): void => {
    if (operationType === 'add') {
      Toast.loading('上传图片中');
      upload(files[files.length - 1].url).then(res => {//此函数上传图片给阿里云
        if (res.status === 'ok') {
          Toast.hide();
          this.setState({ imgUrl: [{ url: 'http://oss.tdianyi.com/' + res.data.path }] })
          this.props.dispatch({
            type: 'participateActive/setParticipateActive',
            payload: {
              imgUrl: [{ url: 'http://oss.tdianyi.com/' + res.data.path }]
            }
          });
        }
        Toast.hide();
      });
    } else if (operationType === 'remove') {//删除图片
      this.setState({
        imgUrl:[]
      })
     
    }
  };

  render() {
    const { imgUrl } = this.state
    return (
      <div className={styles.active_image}>
        <div className={styles.active_image_title}>设置活动图片</div>
        <div className={styles.cover_img}>
          <ImagePicker
            className={styles.upload_img}
            multiple={false}
            length={1}
            files={imgUrl}
            onChange={this.uploadImage()}
            selectable={!Boolean(this.props.temp_url1) || this.props.temp_url1.length < 1}
          />
        </div>
        {
          imgUrl.length < 1 ? <div className={styles.add_active_img}></div>:null
        }
        {
          imgUrl.length < 1 ? <div className={styles.describe}>上传封面图</div> : null
        }
        
      </div>
    )
  }
})