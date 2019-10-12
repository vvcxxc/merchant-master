import React, { Component } from 'react';
import styles from './index.less';
import { List, Switch, Calendar } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import moment from 'moment';
import request from '@/services/request';
import router from 'umi/router';
import SelectTime from '@/components/select-time';
interface Props {
  choose: (data: Object) => void,
  show:boolean
}

interface stateType  {
  en: boolean,
  show: boolean,
  showStartTimg: Number,
  showEndTimg: Number,
  onSelect: boolean,
  config: Object
}
// 日历组件
export default class CreateCalendar extends Component<Props> {
  state: stateType = {
    en: false,
    show: false,
    showStartTimg: 0,
    showEndTimg:0,
    onSelect:false,
    config: {
    },
  };

  shouldComponentUpdate(nextProps: any, nextState: any) { 
    if (nextProps.show !== nextState.show && nextProps.show!==false ) { 
      this.setState({
        show: true
      })
    }
    return true
  }

  // 关闭日历
  onCancel = () => {
    this.setState({ show: false })
  }

  // 点击确定 获取开始结束时间
  onConfirm = (startTime: number, endTime: number) => {
    this.props.choose({
      startTime: moment(startTime).format('X'),
      endTime: moment(endTime).endOf('day').format('X'),
      showStartTime: moment(startTime).format('YYYY-MM-DD'),
      showEndtTime: moment(endTime).format('YYYY-MM-DD'),
    })
    this.setState({
      show: false
    })
  }

  onSelectHasDisableDate = () => {

  }
  getDateExtra = () => {
    return false
  }

  showCalendar = () => {
    this.setState({ show: true })
  }


  onSelect = (date: number) => {//转化秒 从开始的0秒开始， 结束的59秒结束
    const { onSelect, showEndTimg, showStartTimg } = this.state
    if (showEndTimg) this.setState({ showEndTimg: null })
    this.setState({ onSelect:false})
    if (!onSelect) {
      this.setState({
        showStartTimg: moment(date).format('YYYY-MM-DD')
      })
      this.setState({ onSelect:true})
      return
    }
    this.setState({ showEndTimg: moment(date).format('YYYY-MM-DD') }, () => {
      if (moment(date).format('X') < moment(showStartTimg).format('X')) {
        let save = showStartTimg 
        this.setState({
          showStartTimg: moment(date).format('YYYY-MM-DD'),
          showEndTimg: save
        })
      }
    })
    this.setState({ onSelect: false })
  }

  onClose = () => {
    this.setState({
      show:false
    })
    this.props.choose({})
  }
  render() {
    const now = new Date();
    // extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
    // extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
    // extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
    // extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };
    const { showStartTimg, showEndTimg} = this.state
    return (
      <div className={styles.calendarPage} style={{
        zIndex: this.state.show ? 999 : -11
      }}>
        <div className={styles.shadow} onClick={this.onClose} style={{
          zIndex: this.state.show ? 888 : -11
        }}>{null}</div>
        <div className={styles.headers} style={{ zIndex: this.state.show ? 1000 : -11 }}>
          <div className={styles.title}>选择日期</div>
          <div className={styles.showTime}>
            <div>开始日期 <div className={styles.mydates}>{showStartTimg}</div> </div>
            <div className={styles.start_end}>
              <img src={require('../../assets/start_end.png')} alt="" />
           </div>
            <div>结束日期 <div className={styles.mydates}>{showEndTimg}</div> </div>
          </div>
        </div>
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onSelect={this.onSelect}
          onConfirm={this.onConfirm}
          // onSelectHasDisableDate={this.onSelectHasDisableDate}
          // getDateExtra={this.getDateExtra}
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 91536000000)}
        />
        
        <div style={{ zIndex: this.state.show ? 1000 : -11 }}
          className={styles.calendarBottom} >
          注 1、已开设满减活动的日期不可选取  2、选取的时间段内 不可包含已开设活动的日期
          </div>
      </div>
    )
  }
}