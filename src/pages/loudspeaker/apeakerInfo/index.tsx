import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from './index.less'
import CloudSpeakers from './component/cloud_speakers'
export default class qlPage extends Component {

  state = {
    data: ['1', '2', '3'],
    slideIndex: 0,
    imgHeight: 'auto',
    ApeakerlogisticsContentShow:false
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 10000);
  }

  beforeChangeData = (form, to) => {
    console.log('得到的', form, to);

  }

  render() {
    return (
      <div id={styles.qilin} >
        <div className={styles.logistics}>音箱配送中，
          <span onClick={() => { this.setState({ ApeakerlogisticsContentShow: true }) }}>
            查看物流
          </span>
        </div>
        <WingBlank>
          <Carousel className="space-carousel"
            frameOverflow="visible"
            dots={false}
            // cellSpacing={10}
            slideWidth={0.8}
            autoplay
            infinite
            cellSpacing={40}
            selectedIndex={0}//当前索引
            swipeSpeed={22}
            autoplayInterval={50000000}
            beforeChange={this.beforeChangeData.bind(this)}
            afterChange={index => this.setState({ slideIndex: index })}
          >
            {this.state.data.map((val, index) => (
              <div key={val} style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? 0 : 70,
                marginRight: this.state.slideIndex === index ? '100px' : '0px',
              }}>
                <CloudSpeakers height={this.state.slideIndex === index ? true : false}></CloudSpeakers>
              </div>
            ))}
          </Carousel>
        </WingBlank>

        {
          this.state.ApeakerlogisticsContentShow ?<div className={styles.ApeakerlogisticsContent} >
              <div className={styles.ApeakerlogisticsContentBox}>
                <div className={styles.Apeakerlogisticspages}>
                  <div className={styles.ApeakerlogisticsContentBoxTop}>
                    <div className={styles.topTitleBox}>
                      <div className={styles.topTitle}>运输中</div>
                    </div>
                    <div className={styles.topInfoBox}>
                      <img src='http://oss.tdianyi.com/front/nXdNXH3chEzxB3ttxx8nPY7drynkyzKa.png' />
                      <div className={styles.InfoContent}>
                        <div className={styles.InfoName}>小雅Nano智能音箱</div>
                        <div className={styles.InfoNumber}>顺丰快递：2345325436436543</div>

                      </div>


                    </div>

                  </div>
                  <div className={styles.ApeakerlogisticsContentBoxBottom}>
                    <div className={styles.BottomContent}>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <img src='http://oss.tdianyi.com/front/eB6jeH3JGxcmmxttRwXRhdfMKkY4DnAE.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附对开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/hFbrGPSpa4BT6dcxPiwXTmZp6FhhTcNA.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独安康就是个的饭卡上更加反对开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                      </div>
                      <div className={styles.adderessItem}>
                        <div className={styles.adderessItemTime} style={{ borderRight: 'unset' }}>
                          <div className={styles.ItemTime}>14:14:00</div>
                          <div className={styles.ItemDate}>07-22</div>
                          <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                        </div>
                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                      </div>



                    </div>
                  </div>
                </div>
                <div className={styles.ApeakerlogisticsIcon}>
                  <img src='http://oss.tdianyi.com/front/EXTRQaQrDpzhmBFPikBAGHhterG6wnHG.png' />
                </div>
              </div>
            </div> : null
        }
      </div>
    )
  }
}