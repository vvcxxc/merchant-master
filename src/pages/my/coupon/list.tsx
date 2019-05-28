import React, { Component } from 'react';
import MyCouponItem from './item';

export default class MyCouponList extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 113, 14, 15, 16, 167, 1778],
  };
  render() {
    const list = this.state.list.map(_ => <MyCouponItem key={_} />);
    return <div>{list}</div>;
  }
}
