/**title: 我的云音箱 */
import React, { Component } from 'react';
import styles from './index.less';
import speakersRequest from '@/services/speakersRequest';
import request from '@/services/request';
import { Toast } from 'antd-mobile';
import wx from 'weixin-js-sdk';
import router from 'umi/router';

export default class ApeakerInfo extends Component {
    state = {
        ApeakerInfoPageContentShow: false,
        phone: '020-80929539',
        alreadyBind: false,
        serialNumber: '',
        data: {
            id: 0,
            number: "",
            bind_time: "",
            status: "",
            is_online: ""
        }
    }

    componentWillMount() {
        let userAgent = navigator.userAgent;
        let isIos = userAgent.indexOf('iPhone') > -1;
        let url: any;
        if (isIos) {
            url = sessionStorage.getItem('url');
        } else {
            url = location.href;
        }
        request({
            url: 'wechat/getShareSign',
            method: 'get',
            params: {
                url
            }
        }).then(res => {
            console.log('diu', res);
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ['getLocation', 'openLocation', 'scanQRCode']
            });
        }).catch(err => {
            console.log(err)
        });
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        speakersRequest({
            url: 'api/v1/voice/device',
            method: 'get',
        }).then(res => {
            if (res.status_code == 200 && res.data.number) {
                this.setState({ data: res.data, alreadyBind: true })
            } else if (res.status_code == 200) {
                this.setState({ data: res.data })
            } else {
                Toast.fail(res.message, 1.5);
            }
        }).catch(err => {
            console.log(err)
        });
    }
    BindScanQRCode = () => {
        wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            desc: 'scanQRCode desc',
            success: ({ resultStr }: any) => {
                let res = JSON.parse(resultStr)
                console.log(res);
            }
        })
    }
    changeCode = (e: any) => {
        console.log(e.target.value)
        this.setState({ serialNumber: e.target.value })
    }
    bindSpeaker = () => {
        if (this.state.serialNumber) {
            // pZnnQ1yaq2pIQqTlboxV
            // YX1000002
            speakersRequest({
                url: 'api/v1/voice/device/bind',
                method: 'post',
                params: {
                    number: this.state.serialNumber
                }
            }).then(res => {
                if (res.status_code == 200) {
                    Toast.success(res.message, 1.5);
                    this.setState({ alreadyBind: true }, () => {
                        this.getData();
                    })
                } else {
                    Toast.fail(res.message, 1.5);
                }
            }).catch(err => {
                console.log(err)
            });
        } else {
            Toast.fail('请输入序列号', 1.5);
        }
    }
    testSpeaker = () => {
        console.log('测试播报')
    }
    removeBind = () => {
        this.setState({ ApeakerInfoPageContentShow: false })
        speakersRequest({
            url: 'api/v1/voice/device/unbind',
            method: 'put',
        }).then(res => {
            if (res.status_code == 200) {
                Toast.success(res.message, 1.5);
                this.setState({ alreadyBind: false, data: [], serialNumber: '' })
            } else {
                Toast.fail(res.message, 1.5);
            }
        }).catch(err => {
            console.log(err)
        });
    }
    render() {
        return (
            <div className={styles.ApeakerInfoPage} >
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >序列号</div>
                    {
                        this.state.alreadyBind ? <div className={styles.ApeakerItemBoxInput}>{this.state.data.number}</div> :
                            <input className={styles.ApeakerItemBoxInput} placeholder='请输入序列号' onChange={this.changeCode.bind(this)} />
                    }
                    <div className={styles.ApeakerItemBoxIcon} onClick={this.BindScanQRCode.bind(this)} >
                        <img src='http://oss.tdianyi.com/front/dDcWJ6WfMQ56PyexPssd52sbCGkT43dw.png' />
                    </div>
                </div>
                <div className={styles.warps}></div>
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >添加时间</div>
                    <div className={styles.ApeakerItemBoxInput}  >{this.state.data.bind_time ? this.state.data.bind_time : '无'}</div>
                    <div className={styles.ApeakerItemBoxIcon}>
                        {
                            this.state.data.bind_time ? <img src='http://oss.tdianyi.com/front/rXZTZNnAaP4h8Qt7krf5aHBZCrARf8kh.png' /> :
                                <img src='http://oss.tdianyi.com/front/TXz66kWyHNxQzzYfpbJAtp4HxMzTQ33m.png' />
                        }
                    </div>

                </div>
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >在线状态</div>
                    <div className={styles.ApeakerItemBoxInput}  >{this.state.data.is_online ? this.state.data.is_online : '无'}</div>
                    <div className={styles.ApeakerItemBoxIcon} >
                        {
                            this.state.data.is_online ? <img src='http://oss.tdianyi.com/front/aeGN6wNJZBt7cZW6bhjkr3ric44BR72Q.png' /> :
                                <img src='http://oss.tdianyi.com/front/NsfWM6CGezppjitEyzifxYXFQjFxaEMB.png' />
                        }
                    </div>

                </div>
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >设备状态</div>
                    <div className={styles.ApeakerItemBoxInput}  >{this.state.data.status ? this.state.data.status : '无'}</div>
                    <div className={styles.ApeakerItemBoxIcon} >
                        {
                            this.state.data.status ? <img src='http://oss.tdianyi.com/front/nXdNXH3chEzxB3ttxx8nPY7drynkyzKa.png' /> :
                                <img src='http://oss.tdianyi.com/front/tKWdw2xTWBRifwrxGJkQTAf64CxRR548.png' />
                        }


                    </div>
                </div>

                <div className={styles.codeBox} >
                    {
                        this.state.alreadyBind ? <div className={styles.codeBoxBottomContent} >
                            <div className={styles.ApeakerItemBoxCodeItemBox} onClick={() => { this.setState({ ApeakerInfoPageContentShow: true }) }}>
                                <div className={styles.ApeakerItemBoxCodeItemImg} >
                                    <img src='http://oss.tdianyi.com/front/6tnnhaEWGAAsAFQTa3wPW8iTDMAasSyb.png' />
                                </div>
                                <div className={styles.ApeakerItemBoxCodeItemInfo} >解除绑定</div>
                            </div>

                            <div className={styles.ApeakerItemBoxCodeItemBox} onClick={this.testSpeaker.bind(this)} >
                                <div className={styles.ApeakerItemBoxCodeItemImg} >
                                    <img src='http://oss.tdianyi.com/front/SWQWsjBRz6SziJi4wmktp5Y2ActymrEk.png' />
                                </div>
                                <div className={styles.ApeakerItemBoxCodeItemInfo} >测试播报</div>
                            </div>
                        </div> : <div className={styles.codeBoxBottomContent} >
                                <div className={styles.ApeakerItemBoxCodeItemBox} onClick={this.bindSpeaker.bind(this)}>
                                    <div className={styles.ApeakerItemBoxCodeItemImg} >
                                        {
                                            this.state.serialNumber ? <img src='http://oss.tdianyi.com/front/xhQDHWMkaET2Z48CsZKRQaaXQrJbhiFw.png' /> :
                                                <img src='http://oss.tdianyi.com/front/SjSaW2XDbSpbw8RepZ8BeXxG4M8Nhrs7.png' />
                                        }

                                    </div>
                                    <div className={styles.ApeakerItemBoxCodeItemInfo} >绑定音箱</div>
                                </div>
                                <div className={styles.ApeakerItemBoxCodeItemBox} onClick={() => { router.push('/loudspeaker/apeakerInfo') }} >
                                    <div className={styles.ApeakerItemBoxCodeItemImg} >
                                        <img src='http://oss.tdianyi.com/front/STxDe4XwRZFZdBzw6zrHTBYRjFGPC8zF.png' />
                                    </div>
                                    <div className={styles.ApeakerItemBoxCodeItemInfo} >购买音箱</div>
                                </div>
                            </div>
                    }
                    <a href={'tel:' + this.state.phone}>
                        <div className={styles.codeBoxBottom} >客服电话-{this.state.phone}</div>
                    </a>
                </div>
                {/* <div className={styles.successInfoBox} >
                    <img className={styles.successInfoBoxImg} src='http://oss.tdianyi.com/front/6FG62TJFciSbJr6A46zdmFwFMmzBABYa.png' />
                    <div className={styles.successInfoBoxInfo} >成功绑定</div>
                </div> */}
                {
                    this.state.ApeakerInfoPageContentShow ? <div className={styles.ApeakerInfoPageContent} >
                        <div className={styles.ApeakerInfoPageContentBox}>
                            <div className={styles.ContentBoxTop}>
                                <div className={styles.ContentBoxTopTitle}>解除绑定</div>
                                <div className={styles.ContentBoxTopInfo}>解除设备后，您将无法接受收款语言提醒</div>
                            </div>
                            <div className={styles.ContentBoxBottom}>
                                <div className={styles.ContentBoxBottomCancle} onClick={() => { this.setState({ ApeakerInfoPageContentShow: false }) }}>取消</div>
                                <div className={styles.ContentBoxBottomSumbit} onClick={this.removeBind.bind(this)}>确认</div>
                            </div>
                        </div>
                    </div> : null
                }



            </div >
        );
    }
}

