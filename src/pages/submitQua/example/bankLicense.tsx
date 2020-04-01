import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';
import router from 'umi/router';


export default class BankLicenseExample extends Component {
    /**返回 */
    goBack = () => {
        router.push('/submitQua')
    }
    render() {
        return (
            <div style={{ width: '100%', background: '#fff' }} className={styles.examplePage}>
                <WingBlank>
                    <Flex className={styles.title}>拍照示例：银行开户许可证</Flex>
                    <img src="http://oss.tdianyi.com/front/E3B2mkwtfdN5AncCcDJmye2dzTp4FYKa.png" style={{ width: '100%' }} />
                    <Flex className={styles.footer}>1、请上传银行开户许可证原件照片 </Flex>
                    <Flex className={styles.footer}>2、要求拍摄原件清晰 </Flex>
                    <Flex className={styles.footer}>3、不可使用其他图片替代</Flex>
                    <Button type="primary" style={{ marginTop: 60 }} className={styles.button} onClick={this.goBack}>
                        我已了解，去上传
                    </Button>
                </WingBlank>
            </div>
        )
    }
}
