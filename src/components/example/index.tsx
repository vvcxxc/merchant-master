import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import upload from '@/services/oss';
import { connect } from 'dva';
import Cookies from 'js-cookie';

interface Props {
    //示例图片
    exampleImg: string,
    //上传按钮文本，可不传
    btnMsg?: string,
    //上传回调
    onUpload: (query: any) => any;
    //取消，隐藏组件
    onCancle: () => any;
}
export default class ExampleImg extends Component<Props> {
    state = {
        exampleImgShow: false,
        manage_list: [],
        manage_type: '',
        value: [],
        modal1img: [],
    }

    componentDidMount() {

    }

    handleClick = (files: any) => {
        Toast.loading('')
        if (files[0]) {
            let img = files[0].url;
            upload(img).then(res => {
                Toast.hide();
                let returnImgUrl = res.data.path;
                let query = { files, returnImgUrl };
                this.props.onUpload && this.props.onUpload(query);
                this.onCancle();
            })
        } else {
            Toast.hide();
        }
    }
    onCancle = () => this.props.onCancle && this.props.onCancle();
    render() {
        return (
            <div className={styles.exampleImgBox}>
                <div className={styles.exampleImgContent}>
                    <div className={styles.exampleImgTitle}>照片示例 </div>
                    <div className={styles.exampleImgLoadBox}>
                        {/* <img className={styles.iconImg} src="http://oss.tdianyi.com/front/jNWiSr6ZDi65AFbC4tZYczHFJfC5KyMA.png" /> */}
                        <img className={styles.propsImg} src={this.props.exampleImg} />
                    </div>
                    <div className={styles.uploadImg}>
                        <div className={styles.uploadImgWords}>{this.props.btnMsg ? this.props.btnMsg : '上传'}</div>
                        <div className={styles.uploadbtn}>
                            <ImagePicker
                                files={this.state.modal1img}
                                multiple={false}
                                length={1}
                                onChange={this.handleClick}
                            />
                        </div>

                    </div>
                    <div className={styles.cancleImg} onClick={this.onCancle}> 取消</div>
                </div>
            </div>
        )
    }
}



