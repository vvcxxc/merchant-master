import React, { Component } from 'react';
import MyGiveItem from './item';

export default class MyGiveList extends Component {
  state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  render() {
    const list = this.state.map(_ => <MyGiveItem key={_} />);
    return <div>{list}</div>;
  }
}
