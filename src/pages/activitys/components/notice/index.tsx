import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem} from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request'
import { DraggableArea } from 'react-draggable-tags';

export default class Notice extends Component {
  state = {
    /**推荐列表 */
    list: [],
    /**可拖拽列表 */
    drag_list: [],
    /**id(key值) */
    key: '100'
  };

  componentDidMount (){
    request({
      url: 'v3/activity/employ_notice',
      method: 'get',
    }).then(res => {
      let { data } = res;
      this.setState({list: data})
    })
  }


  List = (data: any) => {
    let {tag} = data;
    return (
      <Flex className={styles.row}>
        · {tag.content}
        <img src={require('./delete.png')} onClick={this.Delete.bind(this,tag)}/>
      </Flex>
    )
  }

  /**当拖拽位置发生改变的时候 */
  changeList = (data: any) => {

  }

  /**添加 */
  Add = (item: string) => {
    let { key, drag_list } = this.state;
    let list = {
      id: key,
      content: item
    }
    drag_list.push(list);
    let id = key -1
    this.setState({
      drag_list,
      key: id
    })
  }
  /**删除 */
  Delete = (item: any) => {
  }

  render (){
    const list = this.state.list.map((item: any, idx: any)=>{
      return (
        <Flex key={idx}>
          · {item}
          <img src={require('./add.png')} onClick={this.Add.bind(this,item)}/>
        </Flex>
      )
    })
    // const initialTags = [{
    //   id: '1',
    //   content: '大叔大婶大所多',
    // },{
    //   id: '2',
    //   content: 'watermelon',
    // },{
    //   id: '3',
    //   content: 'banana',
    // },{
    //   id: '4',
    //   content: 'lemon',
    // }];
    const { drag_list } = this.state;
    return (
      <div style={{width: '100%', height: '100%', background: '#fff', position: 'absolute', top: '0'}}>
        <WingBlank>
          <Flex className={styles.title}>使用须知</Flex>
          <div className={styles.box}>
            <div className={styles.list}>
              <DraggableArea
                className={styles.list}
                isList={true}
                tags={drag_list}
                render={this.List}
                onChange={this.changeList}
              />

            </div>
            <div className={styles.button}>完成</div>
          </div>
          <Flex className={styles.tip}>
            <img src={require('./tip.png')}/>
            手指按住后可上下拖曳调整须知排序
          </Flex>

          <Flex className={styles.title}>须知推荐</Flex>
          <div className={styles.box}>
            <ul>
             {list}
            </ul>
            <input type="text" placeholder='自定义'/>
            <div className={styles.button}>添加</div>
          </div>
        </WingBlank>
      </div>
    )
  }
}
