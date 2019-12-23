import React, { Component } from 'react'
import { ImagePicker, Toast } from 'antd-mobile';
import upload from '@/services/oss';
import { connect } from 'dva';
import styles from './index.less'

export default connect(({ participateActive }: any) => participateActive)(
  class ActiveImg extends Component<any> {

    state = {
      cover_image: ''
    }
    componentDidMount() {
      this.setState({
        cover_image: this.props.listImg
      })
      
    }

    //此函数负责 显示 上传 删除 
    uploadImage = () => (files: any[], operationType: string, index?: number): void => {
      if (operationType === 'add') {
        Toast.loading('上传图片中');
        upload(files[files.length - 1].url).then(res => {//此函数上传图片给阿里云
          if (res.status === 'ok') {
            console.log(2);
            Toast.hide();
            this.props.uploadImg(res.data.path)
            this.setState({ cover_image: res.data.path })
          }
          Toast.hide();
        });
      } else if (operationType === 'remove') {//删除图片
        console.log(3);
        this.props.uploadImg('')
        this.setState({ cover_image: ''})
      }
    };

    render() {
      const { cover_image } = this.state
      return (
        <div className={styles.imgbox}>
          <div className={styles.set_prompt}><span>*</span>{'请上传横行的图片，建议图片比例16:9'}</div>
          <div className={styles.active_image}>
            <div className={styles.active_image_title}>设置活动图片</div>
            <div className={styles.cover_img}>
              <ImagePicker
                className={styles.upload_img}
                multiple={false}
                length={1}
                files={cover_image ? [{ url: 'http://oss.tdianyi.com/' + cover_image }] : []}
                onChange={this.uploadImage()}
                selectable={!Boolean(this.props.temp_url1) || this.props.temp_url1.length < 1}
              />
            </div>
            {cover_image.length < 1 ? <div className={styles.add_active_img}></div> : null}            {cover_image.length < 1 ? <div className={styles.describe}>上传封面图</div> :null}
          </div>
        </div>
      )
    }
  })