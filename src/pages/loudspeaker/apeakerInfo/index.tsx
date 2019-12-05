/**title: 我的云音箱 */
import React, { Component } from 'react'
// import { Carousel, WingBlank } from 'antd-mobile';
import styles from './index.less'
import CloudSpeakers from './component/cloud_speakers'
// import wx from 'weixin-js-sdk';
import request from '@/services/request';
import speakersRequest from '@/services/speakersRequest'

interface stateType {
  data?: Array<string>,
  slideIndex: number,
  imgHeight: string,
  ApeakerlogisticsContentShow: boolean,
  phone: string,
  list: any,
  logisticsList:any
}

export default class qlPage extends Component<stateType> {
  state: stateType = {
    data: ['1', '2', '3'],
    slideIndex: 0,
    imgHeight: 'auto',
    ApeakerlogisticsContentShow: false,
    phone: '020-80929539',
    list: {},
    logisticsList: []
  }

  componentDidMount() {
    this.getListData()
    // setTimeout(() => {
    //   this.setState({
    //     data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    //   });
    // }, 10000);
  }

  //请求列表商品数据
  getListData = () => {
    speakersRequest({
      url: 'api/v1/voice',
      method: 'get',

    }).then(res => {
      const { data, status_code } = res
      if (status_code === 200) {
        this.setState({
          list: data[0]
        })
        this.getLogisticsData(data[0].id)
      }
    })
  }

  //请求商品物流信息
  getLogisticsData = (voice_box_id: number) => {
    speakersRequest({
      url: 'api/v1/voice/logistics',
      method: 'get',
      params: {
        voice_box_id
      }
    }).then(res => {
      const { data, status_code } = res
      if (status_code === 200) {
        let mylistData: any = data
        data.logs.map((item:any,index:number) => {
          mylistData.logs[index]['myHours'] = this.handlingTimeHours(item.time*1000)
          mylistData.logs[index]['myMonth'] = this.handlingTimeMonth(item.time*1000)
        })
        this.setState({
          logisticsList: mylistData
        })
      }
    })
  }

  //处理时间 返回小时分钟
  handlingTimeHours = (time: number | string) => {
    let date = new Date(time)
    let getHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let getMinutes =  date.getMinutes() < 10  ?  '0'+date.getMinutes()  : date.getMinutes()
    let getSeconds = date.getSeconds() < 10 ?  '0' + date.getSeconds() : date.getSeconds()
    return getHours + ':' + getMinutes + ':' + getSeconds
  }

  // 处理时间 返回月份日份
  handlingTimeMonth = (time: number | string) => {
    let date = new Date(time)
    let getMonth = date.getMonth() + 1 < 10 ? '0' +( date.getMonth() + 1) : date.getMonth() + 1
    let getDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return getMonth + '-' + getDate
  }

  render() {
    const { list, logisticsList, ApeakerlogisticsContentShow } = this.state
    return (
      <div id={styles.qilin} >
        {
          list.is_buy === 1 ? <div className={styles.logistics}>音箱配送中，
          <span onClick={() => { this.setState({ ApeakerlogisticsContentShow: true }) }}>
              查看物流
          </span>
          </div> : null
        }
          <CloudSpeakers height={true} list={list}></CloudSpeakers>
        {
          ApeakerlogisticsContentShow ? <div className={styles.ApeakerlogisticsContent} >
            <div className={styles.ApeakerlogisticsContentBox}>
              <div className={styles.Apeakerlogisticspages}>
                <div className={styles.ApeakerlogisticsContentBoxTop}>
                  <div className={styles.topTitleBox}>
                    <div className={styles.topTitle}>运输中</div>
                  </div>
                  <div className={styles.topInfoBox}>
                    <img src={list.image} alt=""/>
                    <div className={styles.InfoContent}>
                      <div className={styles.InfoName}>{list.name}</div>
                      <div className={styles.InfoNumber}>
                        {logisticsList.company}{':'}{logisticsList.number}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.ApeakerlogisticsContentBoxBottom}>
                  <div className={styles.BottomContent}>
                    {
                      logisticsList.logs && logisticsList.logs.map((item:any,index:number) => {
                        return <div className={styles.adderessItem} key={item.time}>
                          <div className={styles.adderessItemTime} style={{ borderRight: index == logisticsList.logs.length - 1 ? 'none' :'0.02rem dashed #dee1e4'}}>
                            <div className={styles.ItemTime}>{item.myHours}</div>
                            <div className={styles.ItemDate}>{item.myMonth}</div>
                            {
                              !index ? <img src='http://oss.tdianyi.com/front/eB6jeH3JGxcmmxttRwXRhdfMKkY4DnAE.png' /> : (
                                index !== logisticsList.logs.length - 1 ? <img src='http://oss.tdianyi.com/front/hFbrGPSpa4BT6dcxPiwXTmZp6FhhTcNA.png' />:<img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                              )
                            }
                          </div>
                          <div className={styles.adderessItemMsg}>{item.status}</div>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className={styles.ApeakerlogisticsIcon} onClick={() => { this.setState({ ApeakerlogisticsContentShow: false }) }} >
                <img src='http://oss.tdianyi.com/front/EXTRQaQrDpzhmBFPikBAGHhterG6wnHG.png' />
              </div>
            </div>
          </div> : null
          }
        <a href={'tel:' + this.state.phone}>
          <div className={styles.customer_service} >客服电话-{this.state.phone}</div></a>
      </div>
    )
  }
}