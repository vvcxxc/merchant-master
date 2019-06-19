import React, { Component } from 'react';
import Modal from '../modal';
import { connect } from 'dva';
import styles from './index.less';

interface Props {
	dispatch: (opt: any) => any;
	/**关闭弹窗之后 */
	onConfirm: (isConfirm: boolean) => any;
	showOperationTip?: boolean;
	getRef: (node: any) => any;
}

interface ShowOpt {
	text: string;
}

export default connect(({ app }: any) => app)(
	class OperationTip extends Component<Props> {
		state = {
			text: ''
		};
		componentDidMount = () => this.props.getRef(this);
		show = (options: ShowOpt) => {
			this.props.dispatch({ type: 'app/setOperationTipStatus', payload: true });
			this.setState({ text: options.text });
		};
		hide = () => this.props.dispatch({ type: 'app/setOperationTipStatus', payload: false });
		handleCancel = () => {
			this.hide();
			this.props.onConfirm(false);
		};
		handleConfirm = () => {
			this.hide();
			this.props.onConfirm(true);
		};
		render() {
			return (
				<Modal
					show={!!this.props.showOperationTip}
					onCancel={this.handleCancel}
					onClose={this.handleCancel}
					onConfirm={this.handleConfirm}
				>
					<img src={require('./icon.png')} alt="" />
					<div className={styles.text}>{this.state.text}</div>
				</Modal>
			);
		}
	}
);
