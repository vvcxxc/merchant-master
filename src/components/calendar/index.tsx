import React, { Component } from 'react';
import styles from './index.less'
import moment from 'moment';
import request from '@/services/request';
import {  Toast } from 'antd-mobile';
interface timestampType {
  start?: number,
  end?: number
}
interface Props {
  timestamp?: timestampType,//点击确定的时候会传递时间戳和日期
  confirm: (startTime: number, endTime: number, startDay:number, endDay:number) => void,
  show: boolean,
  onClose:()=>void
}


export default class Calendar extends Component<Props> {

  state = {
    weekTime: ['日', '一', '二', '三', '四', '五', '六'],
    mounthTitle: ['一个月', '三个月', '半年', '一年'],
    showMounthTitle: 0,
    year: 0,      //显示的年
    mounth: 0,     //显示的月
    day: 0,       //显示当月所在日
    totalDay: [], //当月的总天数
    startDay: 0,
    endDay: 0,
    nowWeek: 0,//一周的某天
    forbidData: [],
    startTime: 0,
    endTime: 0,
    identify: 0

  }

  componentDidMount() {
    this.firstRender()
  }

  //首次渲染
  firstRender = () => {
    let date = new Date()
    this.setState({
      mounth: date.getMonth(),
      year: date.getFullYear(),
      day: date.getDate(),
    })
    this.count(date.getFullYear(), date.getMonth(), date.getDate())
  }

  //月份切换
  onClickMounthTitle = (index: number) => {
    this.setState({ showMounthTitle: index })
    switch (index) {
      case 0:
        this.monthNext()
        break;
      case 1:
        this.monthThree()
        break;
      case 2:
        this.monthSix()
        break;
      case 3:
        this.monthYear()
        break;
    }
  }

  //活动已经存在 
  forbidActivity = () => {
    console.time();
    
    const { year, mounth } = this.state
    const res: any = request({
      url: 'v3/getActivityTimeByMonth',
      method: 'get',
      params: {
        year,
        month: mounth + 1
      }
    }).then((res) => {
      let save: Array<Object> = []
      const { code, data } = res
      switch (code) {
        case 200:
          if (!res.data[0]) return
          res.data.forEach((item: any, index: number) => {
            let start = new Date(item.begin_time)
            start.setHours(0)
            let end = new Date(item.end_time)
            start.setHours(0)
            save.push({
              'start': start.getTime(),
              'end': end.getTime(),
            })
          });
          break;
        default:
          break;
      }
      let saveArray: Array<number> = []
      this.state.totalDay.filter((filter: any, indexF: number) => {
        if (saveArray.includes(filter.time)) return
        save.map((item: any, index: number) => {
          item.start <= filter.time && filter.time <= item.end ? saveArray.push(filter.time) : null
         })
      })
      this.setState({ forbidData: saveArray })
      console.timeEnd()
    })
   
  }



  count = (year: number, mounth: number, day?: number) => {
    let date = new Date()
    date.setFullYear(year)
    this.setState({ year: date.getFullYear() }, () => {
      this.forbidActivity()//禁止选择的
    })
    day ? this.setState({ day: day }) : null
    date.setDate(1)
    date.setMonth(mounth)
   
    this.countTotalDay(year, mounth)//计算总天数
    this.locationEarly(year, mounth)//定位每月1号在周几

    
  }

  //计算总天数
  countTotalDay = (year: number, mounth: number) => {
    let date = new Date()
    date.setFullYear(year)
    date.setMonth(mounth + 1)
    date.setDate(0) //上个月最大一天          
    let totalDay = [];
    let total: any = [];
    for (let i = 1; i <= date.getDate(); i++) {
      totalDay.push(i)
    }
    date.setMonth(mounth)
    totalDay.forEach(item => {
      date.setDate(item)
      date.setHours(0)
      date.setMinutes(0)
      date.setMilliseconds(0)
      date.setSeconds(0)
      total.push({
        title: item,
        time: date.getTime()
      })
    });
    this.setState({ totalDay: total })

  }

  //定位每月1号在周几
  locationEarly = (year: number, mounth: number) => {
    let date = new Date()
    date.setFullYear(year)
    date.setMonth(mounth)
    date.setDate(1)
    this.setState({ nowWeek: date.getDay() })
  }

  onClickDate = (time: number, index: number) => {
    const { identify, startTime, endTime } = this.state
    let start = startTime
    let end = endTime
    let timeS = time
    switch (identify) {
      case 0:
        this.setState({
          startTime: time,
          identify: 1,
          startDay: new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate(),
          endDay: 0
        })//点击第一次， 给开始赋值
        break;
      case 1:
        startTime > time ? this.setState({
          startTime: time, endTime: start, identify: 2,
          startDay: new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate(),
          endDay: new Date(start).getFullYear() + '/' + (new Date(start).getMonth() + 1) + '/' + new Date(start).getDate()
        }) :
          this.setState({
            endTime: time, identify: 2,
            endDay: new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
          })
        break;
      case 2:
        this.setState({
          endTime: 0,
          identify: 1,
          startTime: time,
          startDay: new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate(),
          endDay: 0
        })//点击第三次 ，只给开始的赋值   结束的清空
        break;
      default:
        break;
    }
  }

  //前一个月
  monthBefore = () => {
    const { mounth } = this.state
    switch (mounth) {
      case 0:
        this.setState({
          mounth: 11,
          year: this.state.year - 1
        }, () => {
          this.count(this.state.year, this.state.mounth)
        })
        break;
      case 1:
        this.setState({
          mounth: 0
        }, () => {
          this.count(this.state.year, this.state.mounth)
        })
        break;

      default:
        this.setState({
          mounth: mounth - 1
        }, () => {
          this.count(this.state.year, this.state.mounth)
        })
        break;
    }
  }

  //下一个月 外国月份 0 是首月, 11年末
  monthNext = () => {
    if (this.state.mounth === 11) {
      this.setState({
        mounth: 0,
        year: this.state.year + 1
      }, () => {
        this.count(this.state.year, this.state.mounth)
      })
    } else {
      this.setState({
        mounth: this.state.mounth + 1
      }, () => {
        this.count(this.state.year, this.state.mounth)
      })

    }
  }

  monthThree = () => {//如何计算三月
    if (this.state.mounth >= 9) {
      this.setState({
        mounth: this.state.mounth - 9,
        year: this.state.year + 1
      }, () => {
        this.count(this.state.year, this.state.mounth)
      })
    } else {
      this.setState({
        mounth: this.state.mounth + 3
      }, () => {
        this.count(this.state.year, this.state.mounth)
      })

    }
  }

  monthSix = () => {
    if (this.state.mounth >= 6) {
      this.setState({
        mounth: this.state.mounth - 6,
        year: this.state.year + 1
      }, () => {
        this.count(this.state.year, this.state.mounth, this.state.day)
      })
    } else {
      this.setState({
        mounth: this.state.mounth + 6
      }, () => {
        this.count(this.state.year, this.state.mounth)
      })

    }
  }

  monthYear = () => {
    this.setState({
      mounth: this.state.mounth,
      year: this.state.year + 1
    }, () => {
      this.count(this.state.year, this.state.mounth)
    })
  }

  //关闭日历
  closeCalendar = () => {
    
    this.setState({
      startDay: 0,
      endDay: 0,
      startTime: 0,
      endTime:0
    })
    this.props.onClose()
  }

  //点击确定 组件消失
  onClickConfirm = () => {
    
    
    const { startTime, endTime, startDay, endDay } = this.state
    console.log(startTime, endTime, startDay, endDay);
    if (!startTime && !endTime) {
      Toast.fail('活动时间不能为空')
      return
    }
    if (!endTime) {
      Toast.fail('结束时间不能为空')
      return
    }
    if (startTime == endTime) {
      this.props.confirm((startTime / 1000), ((endTime+86400000-1000)/1000), startDay, endDay)
      return 
    }
    this.props.confirm((startTime/1000), ((endTime - 1000)/1000), startDay, endDay)
  }


  render() {
    const { startTime, endTime, 
       startDay, endDay, nowWeek, showMounthTitle, weekTime, totalDay, year, mounth,  forbidData } = this.state
    return (
      <div className={styles.Page} style={{
        display: this.props.show?'':'none'
      }}>
        <div className={styles.calendar} >
          <div className={styles.title}>
            <div className={styles.titleLeft}>活动时间</div>
            <div className={styles.titleCenter}>
              <div className={styles.showTime}>{startDay ? startDay : null}</div>
              <div className={styles.division}>_</div>
              <div className={styles.showTime}>{endDay ? endDay : null}</div>
            </div>
            <div className={styles.titleRight} onClick={this.closeCalendar}>
              <img src={require('../../assets/error_two.png')} alt="" />
            </div>
          </div>
          <div className={styles.hint}>
            <div>
              <span className={styles.dot}></span>
              已开设满减活动的日期不可选取
              </div>
            <div>
              <span className={styles.dot}></span>
              选取的时间段内不可包含已开设活动的日期
              </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <div onClick={this.monthBefore}>上个月</div>
              <div className={styles.headerCenter}>{year}年{mounth !== 0 ? mounth + 1 : 1}月  </div>
              <div onClick={this.monthNext}>下个月</div>
            </div>
            <div className={styles.headerContent}>
              {
                this.state.mounthTitle.map((item: string, index: number) => {
                  return <div key={index} onClick={this.onClickMounthTitle.bind(this, index, item)} className={showMounthTitle === index ? styles.showMounthTitle : null}>{item}</div>
                })
              }
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.weekTime}>
              <div className={styles.weekTimeContent}>
                {// 周末时间
                  weekTime.map((item: string, index: number) => {
                    return <div key={index}>{item}</div>
                  })
                }
              </div>
            </div>
            <div className={styles.dayBox}>

              <div className={styles.totalDay}>
                {
                  totalDay.map((item: any, index: number) => {
                    return forbidData.includes(item.time) ?
                      <div
                        className={styles.tallLight}
                        key={index}
                        style={{
                          marginLeft: index == 0 ? nowWeek * 14 + 'vw' : 0 + 'px',
                        }}
                      >
                        <div className={styles.day} >
                          <div className={styles.ball} style={{
                            backgroundColor: '#ccc'
                          }}>{item.title}</div>
                        </div>
                        
                        <div className={styles.start_stop} style={{
                          bottom: -41 + '%',
                          left: 10 + '%',
                          color:'#ccc'
                        }}>已有活动</div>
                      </div>
                      :
                    <div
                      key={index}
                      className={styles.tallLight}
                      onClick={
                         this.onClickDate.bind(this, item.time, index)}
                      style={{
                        marginLeft: index == 0 ? nowWeek * 14 + 'vw' : 0 + 'px',
                        backgroundColor: startTime < item.time && startTime && endTime && endTime > item.time ? '#e9eaf3' : '#fff'
                      }}
                    >
                      {
                        startTime == item.time && endTime && endTime != item.time ? <div className={styles.ball_right}></div> : null
                      }
                      {
                        endTime == item.time && startTime && startTime != item.time ? <div className={styles.ball_left}></div> : null
                      }
                      <div className={styles.day} >
                        {
                          startTime == item.time || endTime == item.time ? <div className={styles.ball} style={{
                            backgroundColor: '#293186',
                            color: '#fff'
                          }}>{item.title}</div> : <div className={styles.ball}>{item.title}</div>
                        }
                        {
                          startTime == item.time && endTime != item.time ? <div className={styles.start_stop}>起</div> : null
                        }
                        {
                          endTime == item.time && startTime != item.time ? <div className={styles.start_stop}>止</div> : null
                        }
                        {
                          endTime == item.time && startTime == item.time ? <div className={styles.start_stop} style={{
                            left: 30 + '%'
                          }}>起/止</div> : null
                        }
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
          <div className={styles.foot} onClick={this.onClickConfirm}>
            确定
          </div>
        </div>
      </div>

    )
  }
}