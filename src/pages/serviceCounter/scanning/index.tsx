import React, { Component } from 'react';
import styles from './index.less'
import QRCode from 'qrcode';
type Props = any

export default class ServiceCounter extends Component<Props>{

  state = {
    service: ['扫码核销', '生成服务码'],
    listIndex: 0,
    qrcodeImg:''
  }

  componentDidMount() {
    QRCode.toDataURL('阿敏，你个二货，哈哈哈')                                      // 网络链接转化为二维码
      .then((url: any) => {
       console.log(url);
        this.setState({ qrcodeImg:url})
      })
      .catch((err: any) => { })
  }

  // 索引器
  indexer = (index:number) => {
    console.log(index,'所以韩');
    this.setState({listIndex:index})
  }

  // 扫码
  scanCode = () => {
    console.log('扫码');
    
  }
  // 核销
  cancelAfterVerific = () => {
    console.log('核销');
    
  }

  render() {
    return (
      <div className={styles.serviceCounter}>
        <div className={styles.title}>{/* title */}
          {
            this.state.service.map((item,index) => {
              return <span key={index} className={this.state.listIndex == index ? styles.spanColor:null} onClick={this.indexer.bind(this,index)}>{item}</span>
            })
          }
        </div>

        {
          this.state.listIndex == 0 ? <div className={styles.content}>
            <img src={require('../../../assets/bright.png')} alt="" />
          </div> : <div className={styles.content}>
              <div className={styles.border}>
                <img src={this.state.qrcodeImg} alt="" />
              </div>
              
            </div>
          }
        
        <div className={styles.foot}>
          <div className={styles.foot_head}></div>
          <div className={styles.footContent} onClick={this.cancelAfterVerific}>
            <span>核销记录</span>
            <img src={require('../../../assets/jiantou_right.png')} alt="" />
          </div>
        </div>
      </div>
    )
  }
}