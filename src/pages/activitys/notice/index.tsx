import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem} from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request'
import { DraggableArea } from 'react-draggable-tags';
import { connect } from 'dva'
import router from 'umi/router';
export default connect(({ activity }: any) => activity)(
  class Notice extends Component<any> {
  state = {
    /**推荐列表 */
    list: [],
    /**可拖拽列表 */
    drag_list: [{
      id: '',
      content: ''
    }],
    /**id(key值) */
    key: '100',
    tag: ''
  };

  componentDidMount (){
    let type = this.props.location.query.type;
    let notice_list = [];
    if(type == 1){
      notice_list = this.props.Group.description;
    }else{
      notice_list = this.props.Appreciation.description;
    }
    let drag_list = [];
    if(notice_list){
      for(let i = 0; i < notice_list.length; i ++){
        let list = {
          id: i,
          content: notice_list[i]
        }
        drag_list.push(list);
      }
    }
    this.setState({
      drag_list
    })
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
    this.setState({
      drag_list: data
    })
  }

  /**添加到拖拽 */
  Add = (item: string) => {
    let { key, drag_list } = this.state;
    let list = {
      id: key,
      content: item
    }
    drag_list.unshift(list);
    let id = key -1
    this.setState({
      drag_list,
      key: id
    })
  }
  /**删除 */
  Delete = (item: any) => {
    // let id = item.id;
    let { drag_list } = this.state;
    let list = [...drag_list];
    let idx = list.indexOf(item);
    list.splice(idx,1);
    this.setState({drag_list: list});
  }

  /**添加到推荐 */
  addToRecommend = () => {
    let {tag, key, drag_list} = this.state;
    if(tag){
      let { list } = this.state;
      let lis = [...list];
      let lists = {
        id: key,
        content: tag
      }
      let id = key -1
      drag_list.unshift(lists);
      this.setState({
        drag_list,
        tag: '',
        key: id
      })
    }

  }
  /**input值发生改变 */
  handleChange = (e: any) => {
    this.setState({tag: e.target.value});
  }
  /**完成 */
  Finish = () => {
    let {drag_list} = this.state;
    let description = [];
    if(drag_list){
      for (let i = 0; i < drag_list.length; i ++){
        description.push(drag_list[i].content);
      }
    }
    let type = this.props.location.query.type;
    if(type == 1){
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          description
        }
      })
    }else{
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          description
        }
      })
    }
    router.push('/activitys/group/createGroup')
  }

  render (){
    const list = this.state.list.map((item: any, idx: any)=>{
      return (
        <Flex key={idx}>
          · {item}
          <img src={require('./add.png')} onClick={this.Add.bind(this,item)}/>
        </Flex>
      )
    });
    const { drag_list } = this.state;
    return (
      <div style={{width: '100%', height: '100%', background: '#fff', position: 'fixed', top: '0', left: '0'}}>
        <WingBlank>
          <Flex className={styles.title}>使用须知</Flex>
          <div className={styles.box}>

              <DraggableArea
                className={styles.list}
                isList={true}
                tags={drag_list}
                render={this.List}
                onChange={this.changeList}
              />


            <div className={styles.button} onClick={this.Finish}>完成</div>
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
            <input type="text" placeholder='自定义' onChange={this.handleChange} value={this.state.tag}/>
            <div className={styles.button} onClick={this.addToRecommend}>添加</div>
          </div>
        </WingBlank>
      </div>
    )
  }
})
