import React, { Component } from 'react';
import { Flex, WingBlank, Button } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';

export default class GroupDetails extends Component {
  state = {
    info: {
      activity_image: '',
      group_gif_info: {
        gif_pic: ''
      }
    }
  }
  componentDidMount (){
    request({
      url: 'api/merchant/youhui/group_info',
      method: 'get',
      params: {
        coupons_activity_log_id: '458'
      }
    }).then(res => {
      let {data} = res;
      this.setState({info: data})
    })
  }

  render (){
    const { info } = this.state;
    return (
      <div className={styles.detailsPage}>
        <WingBlank>
          {/* 活动名 */}
          <Flex justify='between' className={styles.headers}>
            <div className={styles.names}>
              活动名称
              <span>进行中</span>
            </div>
            <img src={require('./share.png')}/>
          </Flex>

          {/* 图片 */}
          <Flex className={styles.activity_img}>
            <img src={info.activity_image}/>
          </Flex>

          {/* 基本信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            活动基本信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动类型：</div>
            <div className={styles.item_detail}>拼团</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>原价：</div>
            <div className={styles.item_detail}>180元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>拼团价：</div>
            <div className={styles.item_detail}>60元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>拼团人数：</div>
            <div className={styles.item_detail}>3人</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动时间：</div>
            <div className={styles.item_detail}>2016.8.20 —2018.11.12 </div>
          </Flex>

          {/* 优惠券信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            优惠券信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>市场价：</div>
            <div className={styles.item_detail}>160元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>使用时间：</div>
            <div className={styles.item_detail}>领券内七天有效</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>数量：</div>
            <div className={styles.item_detail}>1000张</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动类型：</div>
            <div className={styles.item_detail}>拼团</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>原价：</div>
            <div className={styles.item_detail}>180元</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>使用须知：</div>
            <div className={styles.item_long}>
              <p>· 消费高峰期时可能需要等</p>
              <p>· 消费高峰期时可能需要等</p>
              <p>· 消费高峰期时可能需要等</p>
            </div>
          </Flex>

          {/* 礼品信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            礼品信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>礼品名称：</div>
            <div className={styles.item_detail}>杯子</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>礼品图片：</div>
            <div className={styles.item_img}>
              <img src={info.group_gif_info.gif_pic}/>
            </div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>所需积分：</div>
            <div className={styles.item_detail}>2018积分</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>配送方式：</div>
            <div className={styles.item_long}>
              <p>自取 自取地址</p>
              <p>邮寄 邮费谁出</p>
            </div>
          </Flex>

          {/* 撤销按钮 */}
          <Button type='primary' style={{marginTop: 50, marginBottom: 30}}>撤销活动</Button>

        </WingBlank>
      </div>
    )
  }
}
