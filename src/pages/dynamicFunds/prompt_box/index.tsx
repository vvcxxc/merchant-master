import React, { Component } from 'react';
// import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less'

interface Props {
  go_right?: number,
  left?: number,
  value: any,
  show: boolean,
  onClcik: (index: number) => void,
  index:number
}
export default class PromptBox extends Component<Props> {

  allowShow = (e:any) => {
    this.props.onClcik(this.props.index)
    e.stopPropagation()
  }
  render() {
    const { go_right, left, value,show } = this.props
    return (
      <div className={styles.balance_img}>
        <img onClick={this.allowShow.bind(this)} src={require('../../../assets/red_query.png')} alt="" />
        {
          show ? <div className={styles.prompt_box} style={{ left: left + 'vw' }}>
            <div id={styles.triangle} style={{ paddingLeft: go_right+'vw'}}>
              <img src={require('../../../assets/triangle.png')} alt="" />
            </div>
            <div className={styles.prompt_value} >
              {value}
            </div>
          </div> : null
        }

      </div>

    )
  }
}