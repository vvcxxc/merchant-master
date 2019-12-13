/**title: 使用规则 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem ,Toast,View} from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request'
import { DraggableArea } from 'react-draggable-tags';
import { connect } from 'dva'
import router from 'umi/router';
// export default connect(({ activity }: any) => activity,({ createCoupon }: any) => createCoupon)(
export default connect(({ activity, createCoupon, participateActive }: any) => ({ activity, createCoupon, participateActive}))(
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
    /**
     * @type =1 为拼团 =2 为增值 =3 为优惠券
     */
    componentDidMount() {
      let type = this.props.location.query.type;
      let notice_list = [];

      switch (type) {
        case 1:
          notice_list = this.props.activity.Group.description;
          break;
        case 2:
          notice_list = this.props.activity.Appreciation.description;
          break;
        case 3:
          notice_list = this.props.createCoupon.couponForm.description
          break;
        case 4:
          notice_list = this.props.participateActive.shop.description
          break;
        default:
          break;
      }

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
      request({
        url: 'v3/activity/employ_notice',
        method: 'get',
      }).then(res => {
        let { data } = res;
        this.setState({ list: data })
      })
    }


    List = (data: any) => {
      let { tag } = data;
      return (
        <Flex className={styles.row}>
          · {tag.content}
          <img src={require('./delete.png')} onClick={this.Delete.bind(this, tag)} />
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
      for (let i = 0; i < drag_list.length; i++) {
        if (drag_list[i].content == item) {
          Toast.fail('此规则已存在',1);
          return;
        }
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
        for (let i = 0; i < drag_list.length; i++) {
          if (drag_list[i].content == tag) {
            Toast.fail('此规则已存在',1);
            return;
          }
        }
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
      this.setState({ tag: e.target.value });
    }
    /**完成 */
    Finish = () => {
      let { drag_list } = this.state;
      let description = [];
      if (drag_list) {
        for (let i = 0; i < drag_list.length; i++) {
          description.push(drag_list[i].content);
        }
      }
      let type = this.props.location.query.type;
      if (type == 1) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            description
          }
        })
        // router.push('/activitys/group/createGroup')
      } else if (type == 2) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            description
          }
        })
        // router.push('/activitys/appreciation/createAppreciation')
      } else if (type == 3) {
        this.props.dispatch({
          type: 'createCoupon/setCoupon',
          payload: {
            description
          }
        });
      }
      else if (type == 4) {
        this.props.dispatch({
          type: 'participateActive/setShop',
          payload: {
            description
          }
        });
      }
      router.goBack()
    }
    
    handleChangeBlur = (e) => {
      window.scrollTo(0, 0)
    }

    render() {

      return (
        <View style={{ position: 'fixed', height: '100vh', width: '100vw', overflow: 'scroll',top:0,left:0 }}>
        <div style={{ width: '100%', height: '100%', background: '#fff' }}>
          <WingBlank>
            <Flex className={styles.title}><div>使用须知</div></Flex>
            <div className={styles.box}>
              {
                this.state.drag_list.length == 0 ? <div className={styles.nullListMsg}>暂无设置规则</div> : null
              }
              {
                this.state.drag_list.map((item, index) => {
                  return (
                    <Flex key={item.id} className={styles.row}>
                      <div className={styles.row_msg}>{item.content}</div>
                      <img src={require('./delete.png')} onClick={this.Delete.bind(this, item)} />
                    </Flex>
                  )
                })
              }
            </div>
            <Flex className={styles.tip}>
            <img src={require('./tip.png')}/>上下滑动查看更多
          </Flex>
            <Flex className={styles.title}><div>须知推荐</div></Flex>
            <div className={styles.box2}>
              {this.state.list.map((item: any, idx: any) => {
                return (
                  <Flex key={idx} className={styles.row2}>
                    <div className={styles.row_msg}>{item}</div>
                    <img src={require('./add.png')} onClick={this.Add.bind(this, item)} />
                  </Flex>
                )
              })}
            </div>
            <Flex className={styles.title}><div>自定义</div></Flex>
            <div className={styles.inputBox}>
              <input type="text" placeholder='自定义' onChange={this.handleChange}  onBlur={this.handleChangeBlur.bind(this)} value={this.state.tag} />
              <div className={styles.button2} onClick={this.addToRecommend}>添加</div>
            </div>
            <div className={styles.button} onClick={this.Finish}>保存</div>
          </WingBlank>
        </div>
        </View>
      )
    }
  })
