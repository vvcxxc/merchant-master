/**title: 我的云音箱 */
import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import wx from 'weixin-js-sdk';

export default class ApeakerInfo extends Component {
    state = {
        ApeakerInfoPageContentShow: false
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
    render() {
        return (
            <div className={styles.ApeakerInfoPage} >
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >序列号</div>
                    <input className={styles.ApeakerItemBoxInput} placeholder='请输入序列号' />
                    <div className={styles.ApeakerItemBoxIcon} onClick={this.BindScanQRCode.bind(this)} >
                        <img src='http://oss.tdianyi.com/front/dDcWJ6WfMQ56PyexPssd52sbCGkT43dw.png' />

                    </div>

                </div>
                <div className={styles.warps}></div>
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >添加时间</div>
                    <div className={styles.ApeakerItemBoxInput}  >无</div>
                    <div className={styles.ApeakerItemBoxIcon}>
                        <img src='http://oss.tdianyi.com/front/TXz66kWyHNxQzzYfpbJAtp4HxMzTQ33m.png' />
                        {/* <img src='http://oss.tdianyi.com/front/rXZTZNnAaP4h8Qt7krf5aHBZCrARf8kh.png' /> */}
                    </div>

                </div>
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >在线状态</div>
                    <div className={styles.ApeakerItemBoxInput}  >无</div>
                    <div className={styles.ApeakerItemBoxIcon} >
                        <img src='http://oss.tdianyi.com/front/NsfWM6CGezppjitEyzifxYXFQjFxaEMB.png' />
                        {/* <img src='http://oss.tdianyi.com/front/aeGN6wNJZBt7cZW6bhjkr3ric44BR72Q.png' /> */}
                    </div>

                </div>
                <div className={styles.ApeakerItemBox} >
                    <div className={styles.ApeakerItemBoxTitle} >设备状态</div>
                    <div className={styles.ApeakerItemBoxInput}  >无</div>
                    <div className={styles.ApeakerItemBoxIcon} >
                        <img src='http://oss.tdianyi.com/front/tKWdw2xTWBRifwrxGJkQTAf64CxRR548.png' />
                        {/* <img src='http://oss.tdianyi.com/front/nXdNXH3chEzxB3ttxx8nPY7drynkyzKa.png' /> */}
                    </div>
                </div>



                <div className={styles.codeBox} >
                    <div className={styles.codeBoxBottomContent} >
                        <div className={styles.ApeakerItemBoxCodeItemBox} >
                            <div className={styles.ApeakerItemBoxCodeItemImg} >
                                <img src='http://oss.tdianyi.com/front/SjSaW2XDbSpbw8RepZ8BeXxG4M8Nhrs7.png' />
                            </div>
                            <div className={styles.ApeakerItemBoxCodeItemInfo} >绑定音箱</div>
                        </div>
                        {/* <div className={styles.ApeakerItemBoxCodeItemBox} >
                            <div className={styles.ApeakerItemBoxCodeItemImg} >
                                <img src='http://oss.tdianyi.com/front/xhQDHWMkaET2Z48CsZKRQaaXQrJbhiFw.png' />
                            </div>
                            <div className={styles.ApeakerItemBoxCodeItemInfo} >绑定音箱</div>
                        </div>
                        
                        <div className={styles.ApeakerItemBoxCodeItemBox} onClick={()=>{this.setState({ApeakerInfoPageContentShow:true})}}>
                            <div className={styles.ApeakerItemBoxCodeItemImg} >
                                <img src='http://oss.tdianyi.com/front/6tnnhaEWGAAsAFQTa3wPW8iTDMAasSyb.png' />
                            </div>
                            <div className={styles.ApeakerItemBoxCodeItemInfo} >解除绑定</div>
                        </div> */}
                        <div className={styles.ApeakerItemBoxCodeItemBox} >
                            <div className={styles.ApeakerItemBoxCodeItemImg} >
                                <img src='http://oss.tdianyi.com/front/zByNFkmCDptdYB4nQ3dc5GNsFfSk2SDN.png' />
                            </div>
                            <div className={styles.ApeakerItemBoxCodeItemInfo} >购买音箱</div>
                        </div>
                        {/* <div className={styles.ApeakerItemBoxCodeItemBox} >
                            <div className={styles.ApeakerItemBoxCodeItemImg} >
                                <img src='http://oss.tdianyi.com/front/SWQWsjBRz6SziJi4wmktp5Y2ActymrEk.png' />
                            </div>
                            <div className={styles.ApeakerItemBoxCodeItemInfo} >测试播报</div>
                        </div> */}
                    </div>
                    <div className={styles.codeBoxBottom} > 客服电话-123654586</div>
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
                                <div className={styles.ContentBoxBottomCancle}>取消</div>
                                <div className={styles.ContentBoxBottomSumbit}>确认</div>
                            </div>
                        </div>
                    </div> : null
                }


                <div className={styles.ApeakerlogisticsContent} >
                    <div className={styles.ApeakerlogisticsContentBox}>
                        <div className={styles.Apeakerlogisticspages}>
                            <div className={styles.ApeakerlogisticsContentBoxTop}>
                                <div className={styles.topTitleBox}>
                                    <div className={styles.topTitle}>运输中</div>
                                </div>
                                <div className={styles.topInfoBox}>
                                    <img src='http://oss.tdianyi.com/front/nXdNXH3chEzxB3ttxx8nPY7drynkyzKa.png' />
                                    <div className={styles.InfoContent}>
                                    <div className={styles.InfoName}>小雅Nano智能音箱</div>
                                    <div className={styles.InfoNumber}>顺丰快递：2345325436436543</div>

                                    </div>


                                </div>

                            </div>
                            <div className={styles.ApeakerlogisticsContentBoxBottom}>
                                <div className={styles.BottomContent}>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <img src='http://oss.tdianyi.com/front/eB6jeH3JGxcmmxttRwXRhdfMKkY4DnAE.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附对开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/hFbrGPSpa4BT6dcxPiwXTmZp6FhhTcNA.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独安康就是个的饭卡上更加反对开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                                    </div>
                                    <div className={styles.adderessItem}>
                                        <div className={styles.adderessItemTime} style={{ borderRight: 'unset' }}>
                                            <div className={styles.ItemTime}>14:14:00</div>
                                            <div className={styles.ItemDate}>07-22</div>
                                            <img src='http://oss.tdianyi.com/front/e6HEEpibS3B28W4KpW6eyEhGQ7TYJn6M.png' />
                                        </div>
                                        <div className={styles.adderessItemMsg}>恐惧和孤独斯拉夫的疯狂进攻腊斯克附近的安康就是个的饭卡上更加反对开挂撒</div>
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div className={styles.ApeakerlogisticsIcon}>
                            <img src='http://oss.tdianyi.com/front/EXTRQaQrDpzhmBFPikBAGHhterG6wnHG.png' />
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

