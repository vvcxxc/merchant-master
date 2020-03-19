import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode';
import styles from './index.less'


interface Props {
  show: boolean,
  close: () => void,
  details: any
}
// 拼团海报
export default class Poster extends Component<any> {
  state = {
    imgurl: '',
    show: false,
    gift: ''
  }

  shouldComponentUpdate(nextProps: Props, nextState: Props) {
    if (nextProps.show !== nextState.show) {
      if (!this.state.show) {
        this.setState({ show: true })
        this.state.imgurl.length < 1 && this.showMyPoster()
      }
    }
    return true
  }

  showMyPoster = () => {
    console.log(this.props.list, 'list')
    let dom = document.getElementById('metas')
    QRCode.toDataURL(this.props.list.link)                                      // 网络链接转化为二维码
      .then((url: any) => {
        this.setState({ gift: url }, () => {
          html2canvas(dom, {                                //canvas截图生成图片
            height: dom.offsetHeight,
            width: dom.offsetWidth,
            allowTaint: false,
            useCORS: true,
          }).then((res: any) => {
            let imgurl = res.toDataURL('image/jpeg');
            this.setState({ imgurl })
          })
        })
      })
      .catch((err: any) => { })
  }

  //关闭海报
  closePoster = () => {
    this.props.close()
    this.setState({
      show: false
    })
  }

  noAllow = (e: any) => {
    e.stopPropagation();
  }
  render() {
    const { list } = this.props
    const { gift } = this.state
    const dom = <div className={styles.poster_box} id="metas" onClick={this.closePoster}>
      <img className={styles.title_img} src={require('../../../../../../assets/poster_head.png')} alt="" />
      <div className={styles.main}>

        <div className={styles.gift_img}>
          <img src={list.big_pic} alt="" />
          { //礼品id不能为0
            list.gift_id ? <ul>
              <li>下单即送礼品</li>
              <li >
                {/* <img src={list.shop_door_header_img} alt="" /> */}
                <img src={list.gif_pic} alt="" />
                <img className={styles.test} src={require('../../../../../../assets/box_shadow.png')} alt="" />
                <span className={styles.giving}>赠</span>
                <span className={styles.price} style={{ color: '#fff' }}>￥{list.gift_money}</span>
              </li>
            </ul> : null
          }
        </div>

        <div className={styles.project_info}>
          <ul className={styles.info_left}>
            <li>拼团价 ￥<span>{list.group_money}</span>
              <span>￥{list.pay_money}</span>
            </li>
            <li>
              <span className={styles.group_number}>{list.coupons_number}人团</span>
            </li>
            <li className="myhidden">
              <div className={styles.text}>
                {
                  list.activity_name && list.activity_name.length > 20 ? list.activity_name.slice(0, 24) + '...' : list.activity_name
                }
              </div></li>
            <li><div className={styles.text}>适用店铺：
              {list.name && list.name.length > 11 ? list.name.slice(0, 11) + '...' : list.name}
            </div></li>
            <li>
              <div className={styles.text}> 店铺地址：{list.address && list.address.length > 11 ? list.address.slice(0, 11) + '...' : list.address}
              </div></li>
          </ul>
          <div className={styles.info_right}>
            <img src={gift} alt="" />
            <div>长按查看活动详情</div>
          </div>
        </div>
      </div>
    </div>
    return <main className={styles.poster_main} style={{ display: this.state.show ? '' : 'none' }} onClick={this.closePoster}>

      <div className={styles.hidden_page}>{dom}</div>
      <img onClick={this.noAllow.bind(this)} className={styles.my_img} src={this.state.imgurl} alt="" />

      <div className={styles.user_button}>长按保存图片到相册</div>
    </main>
  }
}
