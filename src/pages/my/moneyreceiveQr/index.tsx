/**
 * title: 我的收款码
 */
import React, {Component} from 'react';
import request from '@/services/request';

export default class MoneyReceiveQr extends Component {
  state = {
    list: []
  };
  componentDidMount (){
    request({
      url: 'api/merchant/supplier/pay_code_list',
      method: 'get'
    }).then(res => {
      let {data} = res;
      this.setState({
        list: data.code_list
      })
    })
  };

  render (){
    const img = this.state.list.map((item, idx) => {
      return <img src={item} key={idx} style={{width: '100%', padding: '.46rem .36rem', boxSizing: 'border-box'}}/>
    })
    return (
      <div style={{width: '100%', height: 'auto', minHeight: '100%', background: '#fff'}}>
        {img}
      </div>
    )
  }
}
