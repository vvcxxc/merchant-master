import React, { Component } from 'react';
import styles from './index.less'

interface Props {
  showPoster: (show: boolean) => any;
  closeShare: (close: boolean) => any;
  showShare: boolean;
 }

export default class BottomShare extends Component<Props>{
  state = {
    showShare: false,
    shareButton:false
  }


  componentDidMount() {
    
  }

  closeShareData = () => {
    this.setState({ showShare: true }) // 控制关闭分享组件
    this.setState({ shareButton: true }) //取消按钮变色
    setTimeout(() => {
      this.props.closeShare(false)
      this.setState({ shareButton: false }) //取消按钮变色
    }, 100);
  }

  showPosterData = () => {
    this.props.showPoster(true)
  }

  render() {
    return (
      <div style={{ display: this.props.showShare ? '':'none'}} className={styles.keep_out}>
        <div className={styles.share_box}>
          <div className={styles.box}>
            <div className={styles.all_center} onClick={this.closeShareData}>
              <img src={require('../../../../../assets/share.png')} alt="" />
              <div className={styles.text_center}>分享</div>
            </div>
            <div className={styles.all_center} onClick={this.showPosterData}>
              <img src={require('../../../../../assets/posters.png')} alt="" />
              <div className={styles.text_center} >生成海报</div>
            </div>
          </div>
          <div className={styles.cancel} onClick={this.closeShareData} style={{ backgroundColor: this.state.shareButton ? 'rgba(0,0,0,0.05)':''}}>取消</div>
        </div>
      </div>
    )
  }
}
