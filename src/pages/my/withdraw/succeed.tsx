import React, { Component } from 'react';
import styles from './index.less';
import { Flex, Button, WingBlank } from 'antd-mobile'

interface Props {
  onChange: () => any;
  list: any;
}

export default class Succeed extends Component<Prop> {
  state = {};

  succeed = () => {
    this.props.onChange()
  }

  render (){
    const info = this.props.list
    return (
      <div className={styles.succeed_page}>
        <Flex className={styles.showBox}>
          <div className={styles.show_box}>
            <Flex className={styles.list}>
              <div className={styles.name}>提现账户</div>
              <div className={styles.msg}>
                <img src={info.img} />
                {info.bank_name}
                ({info.num})
              </div>
            </Flex>
            <Flex className={styles.list} style={{marginTop: 32}}>
              <div className={styles.name}>提现金额</div>
              <div>{info.money}元</div>
            </Flex>
          </div>
        </Flex>
        <WingBlank>
          <Button type="primary" style={{marginTop: 20, marginLeft: 10, marginRight: 10}} onClick={this.succeed}>
						完成
					</Button>
        </WingBlank>
      </div>
    )
  }
}
