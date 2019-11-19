import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

interface Props {
	title: string;
	lookMore?: boolean | undefined;
	isNoDate?: boolean;
	onClickMore?: () => any;
}

export default class Box extends Component<Props> {
	render() {
		const lookMore = this.props.lookMore && (
			<Flex className="lookMore" onClick={this.props.onClickMore}>
				查看详情
				<img src={require('./arrow.png')} />
			</Flex>
		);
		return (
			<div className={styles.box}>
				<Flex className="title" align="end">
					<Flex.Item>{this.props.title}</Flex.Item>
					{/* {lookMore} */}
				</Flex>
        <div className='box_main'>
          <Flex className="box-content" justify="center">
            {this.props.isNoDate ? <span className="tip">暂无数据</span> : this.props.children}
          </Flex>
        </div>
			</div>
		);
	}
}
