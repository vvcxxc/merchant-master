/**
 * title：注册账号
 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, InputItem } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import Axios from 'axios';
import { connect } from 'dva';


// export default class Register extends Component {
export default connect(({ register }: any) => register)(
  class Register extends Component<any> {

    state = {
      errorMobile: false,
      errorCode: false,
      errorAccountName: false,
      errorPassword: false
    }
    componentDidMount() {
      /**获取oss */
      //   request({
      //    url: 'api/v2/up',
      //    method: 'get'
      //  }).then( res => {
      //    let { data } = res;
      //    let oss_data = {
      //      policy: data.policy,
      //      OSSAccessKeyId: data.accessid,
      //      success_action_status: 200, //让服务端返回200,不然，默认会返回204
      //      signature: data.signature,
      //      callback: data.callback,
      //      host: data.host,
      //      key: data.dir
      //    }
      //    window.localStorage.setItem( 'oss_data' , JSON.stringify(oss_data) );
      //  });
      Axios.get('http://release.api.supplier.tdianyi.com/api/v2/up').then(res => {
        let { data } = res.data;
        let oss_data = {
          policy: data.policy,
          OSSAccessKeyId: data.accessid,
          success_action_status: 200, //让服务端返回200,不然，默认会返回204
          signature: data.signature,
          callback: data.callback,
          host: data.host,
          key: data.dir
        };

        window.localStorage.setItem('oss_data', JSON.stringify(oss_data));
      })
      if (this.props.location.query.phone) {
        this.setState({
          is_show: false,
          inviter_phone: this.props.location.query.phone
        })
        this.props.dispatch({
          type: 'register/registered',
          payload: {
            is_show: false,
            inviter_phone: this.props.location.query.phone
          }
        })
      }
    }
    /**设置账号 */
    handleSetUser = (e: any) => {
      this.setState({ username: e });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          username: e
        }
      })
    };
    /**设置手机号 */
    handlePhone = (e: any) => {
      this.setState({ phone: e });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          phone: e
        }
      })
    };
    /**设置密码 */
    handlePassword = (e: any) => {
      this.setState({ password: e });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          password: e
        }
      })
    };
    /**设置验证码 */
    handleCode = (e: any) => {
      this.setState({ code: e });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          code: e
        }
      })
    };
    /**设置邀请人手机号 */
    handleInviter = (e: any) => {
      this.setState({ inviter_phone: e });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          inviter_phone: e
        }
      })
    };
    /**
     * 获取验证码
     */
    getCode = () => {
      const { phone } = this.props;
      let wait = 60;
      if (phone) {
        if (!window.navigator.onLine) {
          Toast.fail('短信发送失败，请稍后重试')
          return;
        }
        request({
          url: 'v3/verify_code',
          method: 'get',
          params: {
            phone: phone,
          }
        }).then(res => {
          let { code } = res;
          if (code == 200) {
            Toast.success('发送验证码成功');
            let timer = setInterval(() => {
              if (wait == 0) {
                this.setState({ is_ok: true });
                this.props.dispatch({
                  type: 'register/registered',
                  payload: {
                    is_ok: true
                  }
                })
                clearInterval(timer)
              } else {
                wait--;
                this.setState({ is_ok: false, wait });
                this.props.dispatch({
                  type: 'register/registered',
                  payload: {
                    is_ok: false,
                    wait
                  }
                })
                clearInterval();
              }
            }, 1000);
          } else {
            Toast.fail('短信发送失败，请稍后重试')
          }
        });
      } else {
        Toast.fail('请输入手机号', 1)
      }
    }
    /**
     * 注册
     */
    register = () => {
      let haveError;
      if (!(/^1[3456789]\d{9}$/.test(this.props.phone))) {
        this.setState({ errorMobile: true });
        haveError = true;
      } else {
        this.setState({ errorMobile: false });
        haveError = false;
      }
      if (!this.props.code) {
        this.setState({ errorCode: true });
        haveError = true;
      } else {
        this.setState({ errorCode: false });
        haveError = false;
      }
      if (!this.props.username) {
        this.setState({ errorAccountName: true });
        haveError = true;
      } else {
        this.setState({ errorAccountName: false });
        haveError = false;
      }
      if (!this.props.password || this.props.password.length < 6) {
        this.setState({ errorPassword: true });
        haveError = true;
      } else {
        this.setState({ errorPassword: false });
        haveError = false;
      }
      if (haveError) {
        return;
      }
      const { username, phone, password, code, inviter_phone } = this.props;
      // if (username && phone && password && code) {
        request({
          url: 'v3/register',
          method: 'post',
          data: {
            user_name: username,
            password,
            user_phone: phone,
            verify_code: code,
            invite_phone: inviter_phone
          },
        }).then(res => {
          let { code, data } = res;
          if (code == 200) {
            Toast.success('注册成功', 2, () => {
              localStorage.setItem('token', 'Bearer ' + res.data.token);
              router.push('/createStore');
            })

          } else {
            Toast.fail(data)
          }
        });
      // } else {
      //   Toast.fail('请将信息填写完整', 2)
      // }
    }

    componentWillUnmount() {
      clearInterval();
    };

    render() {
      const button =
        this.props.is_ok === true ? (
          <div className={styles.sendCode} onClick={this.getCode}>发送验证码</div>
        ) : (
            <div className={styles.doneSend}>{this.props.wait}秒</div>
          );
      const inviter = this.props.is_show == true ? (
        <Flex className={styles.inputWrap}>
          <InputItem
            style={{ width: '100%' }}
            placeholder="请输入邀请人手机号（非必填）"
            value={this.props.inviter_phone}
            onChange={this.handleInviter}
            clear
          />
        </Flex>
      ) : (
          ''
        )
      return (
        <div style={{ height: '100%', width: '100%', background: ' #fff' }}>
          <WingBlank className={styles.wrap}>
            <Flex className={styles.inputWrap}>
              <InputItem
                style={{ width: '100%' }}
                placeholder="请输入账号名"
                value={this.props.username}
                onChange={this.handleSetUser}
                clear
              />
            </Flex>
            {
              this.state.errorAccountName ? <div className={styles.errorLine}>请输入用户名</div> : null
            }
            <Flex className={styles.inputWrap}>
              <InputItem
                style={{ width: '100%' }}
                placeholder="请输入手机号"
                type={'number'}
                value={this.props.phone}
                onChange={this.handlePhone}
                clear
              />
            </Flex>
            {
              this.state.errorMobile ? <div className={styles.errorLine}>请输入正确的11位手机号码</div> : null
            }
            <Flex className={styles.inputWrap}>
              <InputItem
                style={{ width: '100%' }}
                placeholder="请输入不少于6位的密码"
                value={this.props.password}
                onChange={this.handlePassword}
                type={'password'}
                clear
              />
            </Flex>
            {
              this.state.errorPassword ? <div className={styles.errorLine}>请输入不少于6位的密码</div> : null
            }
            <Flex className={styles.inputWrap}>
              <InputItem
                style={{ width: '100%' }}
                placeholder="请输入验证码"
                value={this.props.code}
                onChange={this.handleCode}
                clear
              />
              {button}
            </Flex>
            {
              this.state.errorCode ? <div className={styles.errorLine}>请输入数字验证码</div> : null
            }
            {inviter}
            <WingBlank size="sm">
              <Button type="primary" style={{ marginTop: 60 }} onClick={this.register}>
                注册账号
          </Button>
            </WingBlank>
            <Flex.Item className={styles.footer}>
              点击“注册”即同意<span style={{ color: '#21418A' }}
                onClick={() => { router.push('/login/register/agreement') }}
              >《小熊敬礼服务及隐私条款》</span>
            </Flex.Item>
          </WingBlank>
        </div>
      )
    }
  }
)
