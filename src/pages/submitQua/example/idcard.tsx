import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';
interface Props {
  onChange: () => any
}

export default class IdCardExample extends Component<Props> {
  /**返回 */
  goBack = () => {
    this.props.onChange()
  }
  render (){
    return (
      <div style={{ width: '100%', height: 'auto', background: '#fff', overflow: 'auto' }} className={styles.examplePage}>
        <WingBlank>
          <Flex className={styles.title}>拍照示例：身份证正面照，反面照，营业执照</Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/KphePm5PFat5Bxw6QTKnpZTzwzhjtndH.png'/>
          </Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/ZQZXhz7Pn6hDiXHhezpXSinXXYifzS8e.png'/>
          </Flex>
          <Flex justify='around'>
            <img src='http://oss.tdianyi.com/front/B7jjHxm6XXD6CGbfr6aNCPnYeHW8fTbF.png'/>
          </Flex>
          <Flex className={styles.footer} style={{marginTop: 36}}>请保证身份证各项信息清晰可见，无遮挡</Flex>
          <Button type="primary" style={{ marginTop: 60, marginBottom: 40 }} className={styles.button} onClick={this.goBack}>
            已了解，去上传
          </Button>
        </WingBlank>
      </div>
    )
  }
}
