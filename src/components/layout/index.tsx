import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';
import UndeterminedModal, { Undetermined, After } from './undeterminedModal';
import SelectDate from './selectDate';
import checkIcon from './icon-check.png';
import icon from './icon.png';

interface Props {
	/**无关紧要的信息 */
	hasInsignificant?: boolean;
	/**无关紧要的信息 值 */
	insignificant?: any;
	/**快速筛选条件列表 */
	undetermined: Undetermined;
	undetermined2?: any;
	/**备用筛选条件 */
	after?: After;
	tabs?: string[];
	/**条件重置时 */
	// hotreset?: () => any;
	// timeReset?: () => any;
	onChange?: (query: any) => any;
	onTabChange?: (index: number) => any;
}

/**筛选列表页组件
 *
 * 筛选条件只包含基础选项和时间筛选
 */
export default class FiltrateLayout extends Component<Props> {
	state = {
		/**查询条件 */
		query: {
			/**热门条件选择 */
			hot: {},
			/**时间月份选择 */
			time: ''
		},
		/**显示条件的下拉列表 */
		hotShow: false,
		/**显示时间筛选的下拉层 */
		timeShow: false,
		/**条件是否已选择 */
		hotCheck: false,
		/**是否选择了时间筛选 */
		timeCheck: false,
		tabActive: 0
	};

	handleHotClick = () => this.setState({ hotShow: !this.state.hotShow, timeShow: false });

	handleTimeClick = () => this.setState({ timeShow: !this.state.timeShow, hotShow: false });

	hotChange = (id: any, _id: any) => {
		this.setState({ hotShow: false, query: { ...this.state.query, hot: { id, _id } } }, this.handleQueryChange);
	};
	hotHide = () => this.setState({ hotShow: false });
	timeHide = () => this.setState({ timeShow: false });
	timeChange = (value: string): any => {
		console.log('aa');
		this.setState({ query: { ...this.state.query, time: value }, timeShow: false }, this.handleQueryChange);
	}
	// hotReset = () => this.props.onChange && this.props.onChange({hot: {}, time: this.state.query.time});
	// timeReset = () => this.props.timeReset && this.props.timeReset();

	/**条件变更时触发onChange事件 */
	handleQueryChange = () => this.props.onChange && this.props.onChange(this.state.query);

	handleChangeTab = (index: number) => () => {
		this.setState({ tabActive: index });
		this.props.onTabChange && this.props.onTabChange(index);
	};

	render() {
		const insignificant = this.props.hasInsignificant && (
			<div className={styles.num}>
				<WingBlank>{this.props.insignificant}</WingBlank>
			</div>
		);
		const filterButton = (
			<Flex
				style={{ width: 'auto' }}
				align="center"
				onClick={this.handleHotClick}
				className={this.state.hotCheck || this.state.hotShow ? 'checked' : ''}
			>
				<span>筛选</span>
				<img src={this.state.hotCheck || this.state.hotShow ? checkIcon : icon} />
			</Flex>
		);
		const tabs =
			this.props.tabs &&
			this.props.tabs.map((_, index) => (
				<Flex.Item
					key={_}
					className={this.state.tabActive === index ? 'tabItem active' : 'tabItem'}
					onClick={this.handleChangeTab(index)}
				>
					{_}
				</Flex.Item>
			));
		const tab = this.props.tabs && (
			<Flex.Item>
				<Flex>{tabs}</Flex>
			</Flex.Item>
		);
		const datepng = this.state.timeCheck || this.state.timeShow ? checkIcon : icon;
		return (
			<Flex className={styles.wrap} direction="column">
				<div className={styles.filtrate}>
					<WingBlank>
						<Flex align="center">
							{!!this.props.undetermined.length && filterButton}
							<Flex
								style={{ width: 'auto' }}
								align="center"
								onClick={this.handleTimeClick}
								className={this.state.timeCheck || this.state.timeShow ? 'checked' : ''}
							>
								<span>月份</span>
								<img src={datepng} />
							</Flex>
							{tab}
						</Flex>
					</WingBlank>
				</div>
				{/* 无关紧要的信息 */}
				{insignificant}
				<Flex.Item className={styles.content}>
					<WingBlank style={{ minHeight: '100%' }}>{this.props.children}</WingBlank>
				</Flex.Item>
				<UndeterminedModal
					show={this.state.hotShow}
					onChange={this.hotChange}
					undetermined={this.props.undetermined}
					undetermined2={this.props.undetermined2}
					after={this.props.after}
					// reset={this.hotReset}
					onHide={this.hotHide}
				/>
				<SelectDate
					show={this.state.timeShow}
					// reset={this.timeReset}
					value={this.state.query.time}
					onHide={this.timeHide}
					onChange={this.timeChange}
				/>
			</Flex>
		);
	}
}
