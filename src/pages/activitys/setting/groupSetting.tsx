import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast } from 'antd-mobile';
import styles from './groupSetting.less';
import { connect } from 'dva';
import router from 'umi/router';

/**没有数据的情况 */
export default connect(({ activity }: any) => activity)(
    class groupSetting extends Component<any> {

        state = {
            name: '',
            num: '',
            price: '',
            storeItems: [],
            isHaveData: this.props.Group.storeItems.length != 0 ? true : false
        }


        componentDidMount() {
            console.log(this.props)
            this.setState({
                storeItems: this.props.Group.storeItems
            })
        }

        handleChangeName = (e) => {
            this.setState({
                name: e.target.value
            })
        }

        handleChangeNum = (e) => {
            if (/^[0-9]+$/.test(e.target.value) || e.target.value == "") {
                this.setState({
                    num: e.target.value
                })
            }
        }
        handleChangePrice = (e) => {
            if (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value) || /^[0-9]+\.?$/.test(e.target.value) || e.target.value == "") {
                this.setState({
                    price: e.target.value
                })
            }
        }
        handleDelete = (item: any) => {
            let { storeItems } = this.state;
            let list = [...storeItems]
            let idx = list.indexOf(item);
            list.splice(idx, 1);
            this.setState({
                storeItems: list
            }, () => {
                if(storeItems.length <= 1) {
                   this.setState({
                        isHaveData: false
                   })
                }
            })
        }

        handleSubmit = async () => {
            const { name, num, price } = this.state;
            if (!name || !num || !price) {
                Toast.fail('请将信息填写完整', 2);
                return;
            }
            if (isNaN(Number(num))) {
                Toast.fail('数量必须为数字', 2);
                return;
            }
            if (!Number.isInteger(Number(num))) {
                Toast.fail('数量必须为整数', 2);
                return;
            }
            if (isNaN(Number(price))) {
                Toast.fail('价格必须为数字', 2);
                return;
            }
            await this.props.dispatch({
                type: 'activity/changeIsHaveData',
                payload: {
                    flag: true
                }
            })
            this.setState({
                isHaveData: true,
                storeItems: [
                    ...this.state.storeItems,
                    {
                        name: name,
                        num: num,
                        price: price
                    }
                ]
            }, () => {
                this.setState({
                    name: '',
                    num: '',
                    price: ''
                })
            })
        }

        handleSave = async () => {
            await this.props.dispatch({
                type: 'activity/ReduStoreItem',
                payload: {
                    storeItems: this.state.storeItems
                }
            })
            // if (this.state.storeItems.length == 0) {
            //     this.props.dispatch({
            //         type: 'activity/changeIsHaveData',
            //         payload: {
            //             flag: false
            //         }
            //     })
            // }
            router.goBack()
        }

        render() {
            return (
                <div style={{ width: '100%', height: 'auto', minHeight: '100%', background: '#fff', overflow: 'hidden', display: 'flex' }}>
                    <WingBlank>
                        <div className={styles.store_wrap}>
                            <div className={styles.store_info}>
                                <Flex className={styles.title}><div>商品内容</div></Flex>

                                <Flex className={styles.store_table_title}>
                                    <Flex.Item className={styles.store_table_title_item}>
                                        <div>名称</div>
                                    </Flex.Item>
                                    <Flex.Item className={styles.store_table_title_item}>
                                        <div>数量</div>
                                    </Flex.Item>
                                    <Flex.Item className={styles.store_table_title_item}>
                                        <div>价格</div>
                                    </Flex.Item>
                                    <Flex.Item className={styles.store_table_title_item}>
                                        <div></div>
                                    </Flex.Item>
                                </Flex>

                                <div className={styles.store_data}>
                                    {
                                        this.state.isHaveData ? (
                                            this.state.storeItems.map((item, index) => (
                                                <Flex className={styles.store_data_item} key={index}>
                                                    <Flex.Item className={styles.store_data_item_info}><div style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>{item.name}</div></Flex.Item>
                                                    <Flex.Item className={styles.store_data_item_info}><div>{item.num}</div></Flex.Item>
                                                    <Flex.Item className={styles.store_data_item_info}><div>￥{item.price}</div></Flex.Item>
                                                    <Flex.Item className={styles.store_data_item_info}>
                                                        <div className={styles.delete_btn} onClick={this.handleDelete.bind(this, item)}>—</div>
                                                    </Flex.Item>
                                                </Flex>
                                            ))
                                        ) : (
                                                <div className={styles.no_data}>
                                                    <h3 className={styles.no_data_desc}>暂无商品数据</h3>
                                                </div>
                                            )
                                    }
                                </div>

                                <Flex className={styles.title}><div>添加商品</div></Flex>


                                <Flex>
                                    <Flex.Item className={styles.store_operation_title_item}>
                                        <div>名称</div>
                                    </Flex.Item>
                                    <Flex.Item className={styles.store_operation_title_item}>
                                        <div>数量</div>
                                    </Flex.Item>
                                    <Flex.Item className={styles.store_operation_title_item}>
                                        <div>价格</div>
                                    </Flex.Item>
                                    <Flex.Item className={styles.store_operation_title_item}>
                                        <div></div>
                                    </Flex.Item>
                                </Flex>

                                <Flex>
                                    <Flex.Item className={styles.inputItem}>
                                        <input type="text" value={this.state.name} onChange={this.handleChangeName.bind(this)} />
                                    </Flex.Item>
                                    <Flex.Item className={styles.inputItem}>
                                        <input type="text" value={this.state.num} onChange={this.handleChangeNum.bind(this)} />
                                    </Flex.Item>
                                    <Flex.Item className={styles.inputItem}>
                                        <input type="text" value={this.state.price} onChange={this.handleChangePrice.bind(this)} />
                                    </Flex.Item>
                                    <Flex.Item className={styles.inputItem}>
                                        <Button type="primary" className={styles.submit_btn} onClick={this.handleSubmit.bind(this)}>提交</Button>
                                    </Flex.Item>
                                </Flex>
                            </div>


                            <div className={styles.save_btn}>
                                <Button type="primary" className={styles.save_data} onClick={this.handleSave.bind(this)}>保存</Button>
                            </div>
                        </div>
                    </WingBlank>
                </div>
            )
        }
    }
)