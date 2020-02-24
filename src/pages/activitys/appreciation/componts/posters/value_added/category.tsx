import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode';
import styles from './category.less'


interface Props {
  show: boolean,
  close: () => void,
  details: any
}
// 增值海报
export default class PosterTwo extends Component<any> {

  state = {
    imgurl: '',
    show: false,
    gift: '',
    refs: ''
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
    let dom = document.getElementById('poster')
    QRCode.toDataURL(this.props.list.link)                                      // 网络链接转化为二维码
      .then((url: any) => {
        this.setState({ gift: url }, () => {
          html2canvas(dom, {
            height: dom?.offsetHeight,
            width: dom?.offsetWidth,
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
    const dom = <div
      className={list.gift_id ? styles.poster_have_gift : styles.poster_no_gift} id="poster" >
      <img className={styles.title_img} src={require('../../../../../../assets/poster_head2.png')} alt="" />
      <div className={styles.main}>
        <ul className={styles.gift_img}>
          <li>
            <img src={require('../../../../../../assets/logo.png')} alt="" />
            <div>最高抵用{list.max_money}元</div>
          </li>
          <li><img src={require('../../../../../../assets/progress_bar.png')} alt="" /></li>
          <li>
            <div className={styles.left}>
              <div><span>￥</span>{list.max_money}</div>
              <div><span>通用券</span><span>满{list.total_fee}可用</span></div>
            </div>
            <div className={styles.right}></div>
          </li>
          <li>
            <div>使用时间：<span>{list.use_tim}</span></div>
          </li>
        </ul>

        <div className={styles.info}>
          {
            list.gift_id ? <ul className={styles.gift_box}>
              <li className={styles.left}>
                <span className={styles.giving}>赠</span>
                <img src={list.git_img} alt="" />
              </li>
              <li className={styles.right}>
                <div>
                  <div>{list.gif_name}</div>
                </div>
                <div className={styles.price}>￥<span>{list.gif_money
                  // pay_money
                }</span></div>
              </li>
            </ul> : null
          }
          <div className={styles.project_info}>
            <ul className={styles.info_left}>
              <li>活动价 ￥<span>{list.active_money}</span></li>
              <li className="myhidden" id="myhidden_box">
                <div className={styles.text} id="myhidden">
                  {
                    list.name && list.name.length > 20 ? list.name.slice(0, 24) + '...' : list.name
                  }
                </div>
              </li>
              <li>
                <div className={styles.text}> 适用店铺：
                  {list.name && list.name.length > 11 ? list.name.slice(0, 11) + '...' : list.name}
                </div>
              </li>
              <li>
                <div className={styles.text}>店铺地址：
                {list.address && list.address.length > 11 ? list.address.slice(0, 11) + '...' : list.address}
                </div>
              </li>
            </ul>
            <div className={styles.info_right}>
              <img src={this.state.gift} alt="" />
              <div>长按查看活动详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    return <main onClick={this.closePoster.bind(this)} style={{ display: this.state.show ? '' : 'none'  }}>
      <div className={styles.hidden_page}>{dom}</div>
      <img
        onClick={this.noAllow.bind(this)} className={list.gift_id ? styles.img_have_gift : styles.img_no_gift} src={this.state.imgurl} alt="" />
      <div className={styles.user_button}>长按保存图片到相册</div>
    </main>
  }
}