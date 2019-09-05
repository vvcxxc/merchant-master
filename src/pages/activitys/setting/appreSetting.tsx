/**title: 商品设置 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem } from 'antd-mobile';
import styles from './appreSetting.less';

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

    componentDidMount() {

      let notice_list = [];
      notice_list = this.props.Appreciation.shoppingSetting;
      let drag_list = [];
      if (notice_list) {
        for (let i = 0; i < notice_list.length; i++) {
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
      //   request({
      //     url: 'v3/activity/employ_notice',
      //     method: 'get',
      //   }).then(res => {
      //     let { data } = res;
      //     this.setState({ list: data })
      //   })
    }

    /**添加 */
    Add = (item: string) => {
      let { key, drag_list } = this.state;
      let list = {
        id: key,
        content: item
      }
      drag_list.unshift(list);
      let id = key - 1
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
      list.splice(idx, 1);
      this.setState({ drag_list: list });
    }

    /**添加到推荐 */
    addToRecommend = () => {
      let { tag, key, drag_list } = this.state;
      if (tag) {
        let { list } = this.state;
        let lis = [...list];
        let lists = {
          id: key,
          content: tag
        }
        let id = key - 1
        drag_list.unshift(lists);
        this.setState({
          drag_list,
          tag: '',
          key: id
        }, () => { console.log(this.state) })
      }

    }
    /**input值发生改变 */
    handleChange = (e: any) => {
      this.setState({ tag: e.target.value });
    }
    /**完成 */
    Finish = () => {
      let { drag_list } = this.state;
      let shoppingSetting = [];
      if (drag_list) {
        for (let i = 0; i < drag_list.length; i++) {
          shoppingSetting.push(drag_list[i].content);
        }
      }
  
    
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            shoppingSetting
          }
        })
      router.goBack()
    }

    render() {
      const list = this.state.list.map((item: any, idx: any) => {
        return (
          <Flex key={idx}>
            · {item}
            <img src={require('./add.png')} onClick={this.Add.bind(this, item)} />
          </Flex>
        )
      });
      const { drag_list } = this.state;
      return (
        <div style={{ width: '100%', height: '100%', background: '#fff' }}>
          <WingBlank>
            <Flex className={styles.title}><div>商品内容</div></Flex>
            <div className={styles.box}>
              {
                this.state.drag_list.length==0?<div className={styles.nullListMsg}>暂无商品数据</div>:null
              }
              
              {
                this.state.drag_list.map((item, index) => {
                  return (
                    <Flex key={item.id} className={styles.row}>
                      {item.content}
                      <img src={require('./delete.png')} onClick={this.Delete.bind(this, item)} />
                    </Flex>
                  )
                })
              }
            </div>

            <Flex className={styles.title}><div>添加商品</div></Flex>
            <div className={styles.box2} style={{ border: "none" }}>
              <input type="text" placeholder='自定义' onChange={this.handleChange} value={this.state.tag} />
              <div className={styles.button2} onClick={this.addToRecommend}>添加</div>
            </div>
            <div className={styles.button} onClick={this.Finish}>保存</div>
          </WingBlank>
        </div>
      )
    }
  })
