/** title：注册账号*/
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import Axios from 'axios';
import { connect } from 'dva';

// export default class Register extends Component {
export default connect(({ register }: any) => register)(
  class Register extends Component<any> {
    state = {
      /**账号 */
      username: '',
      /**手机号 */
      phone: '',
      /**密码 */
      password: '',
      /**验证码 */
      code: '',
      /**邀请人手机号 */
      inviter_phone: '',
      /**限制发验证码的次数，每分钟可发一次 */
      is_ok: true,
      wait: '',
      is_show: true,
      errorMobile: false,
      errorCode: false,
      errorAccountName: false,
      errorPassword: false
    };
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
      if (this.props.location.query.invite_phone) {
        this.setState({
          is_show: false,
          inviter_phone: this.props.location.query.invite_phone
        })
        this.props.dispatch({
          type: 'register/registered',
          payload: {
            is_show: false,
            inviter_phone: this.props.location.query.invite_phone
          }
        })
      }
    }
    /**设置账号 */
    handleSetUser = (e: any) => {
      this.setState({ username: e.target.value });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          username: e.target.value
        }
      })
    };
    /**设置手机号 */
    handlePhone = (e: any) => {
      console.log(123)
      this.setState({ phone: e.target.value });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          phone: e.target.value
        }
      })
    };
    /**设置密码 */
    handlePassword = (e: any) => {
      this.setState({ password: e.target.value });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          password: e.target.value
        }
      })
    };
    /**设置验证码 */
    handleCode = (e: any) => {
      this.setState({ code: e.target.value });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          code: e.target.value
        }
      })
    };
    /**设置邀请人手机号 */
    handleInviter = (e: any) => {
      this.setState({ inviter_phone: e.target.value });
      this.props.dispatch({
        type: 'register/registered',
        payload: {
          inviter_phone: e.target.value
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
        Toast.loading('',6000)
        request({
          url: 'v3/verify_code',
          method: 'get',
          params: {
            phone: phone,
          }
        }).then(res => {
          Toast.hide()
          let { code } = res;
          if (code == 200) {
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
            Toast.fail(res.data)
          }
        }).catch(()=>{
          Toast.hide()
        });
      } else {
        Toast.fail('请输入手机号', 1)
      }
    }
    /**
     * 注册
     */
    register = () => {
      let haveError = false;
      if (!(/^1[3456789]\d{9}$/.test(this.state.phone))) {
        this.setState({ errorMobile: true });
        haveError = true;
      } else {
        this.setState({ errorMobile: false });
      }
      if (!this.state.code||this.state.code.length!=6) {
        this.setState({ errorCode: true });
        haveError = true;
      } else {
        this.setState({ errorCode: false });
      }
      if (!this.state.username) {
        this.setState({ errorAccountName: true });
        haveError = true;
      } else {
        this.setState({ errorAccountName: false });
      }
      if (!this.state.password || this.state.password.length < 6) {
        this.setState({ errorPassword: true });
        haveError = true;
      } else {
        this.setState({ errorPassword: false });
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
          <input
            style={{ width: '100%' }}
            placeholder="请输入邀请人手机号（非必填）"
            value={this.props.inviter_phone}
            onChange={this.handleInviter}
          />
        </Flex>
      ) : (
          ''
        )
      return (
        <div style={{ height: '100%', width: '100%', background: ' #fff' }}>
          <WingBlank className={styles.wrap}>
            <Flex className={styles.inputWrap}>
              <input
                style={{ width: '100%' }}
                placeholder="请输入账号名"
                value={this.props.username}
                onChange={this.handleSetUser}
              />
            </Flex>
            {
              this.state.errorAccountName ? <div className={styles.errorLine}>请输入用户名</div> : null
            }
            <Flex className={styles.inputWrap}>
              <input
                style={{ width: '100%' }}
                placeholder="请输入手机号"
                type='number'
                value={this.props.phone}
                onChange={this.handlePhone}
              />
            </Flex>
            {
              this.state.errorMobile ? <div className={styles.errorLine}>请输入正确的11位手机号码</div> : null
            }
            <Flex className={styles.inputWrap}>
              <input
                style={{ width: '100%' }}
                placeholder="请输入不少于6位的密码"
                value={this.props.password}
                onChange={this.handlePassword}
                type='password'
              />
            </Flex>
            {
              this.state.errorPassword ? <div className={styles.errorLine}>请输入不少于6位的密码</div> : null
            }
            <Flex className={styles.inputWrap}>
              <input
                style={{ width: '100%' }}
                placeholder="请输入验证码"
                value={this.props.code}
                onChange={this.handleCode}
                maxLength={6}
              />
              {button}
            </Flex>
            {
              this.state.errorCode ? <div className={styles.errorLine}>请输入正确6位数字验证码</div> : null
            }
            {inviter}
            <WingBlank size="sm">
              <Button type="primary" style={{ marginTop: 60 }} onClick={this.register}>
                注册账号
          </Button>
            </WingBlank>
            <Flex.Item className={styles.footer}>
              点击“注册”即同意<span style={{ color: '#21418A' }} onClick={() => { router.push('/login/register/agreement') }}>《小熊敬礼服务及隐私条款》</span>
            </Flex.Item>
          </WingBlank>
        </div>
      )
    }
  }
)
