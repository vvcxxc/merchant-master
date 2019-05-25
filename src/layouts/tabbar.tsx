import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const TabBarItem = TabBar.Item;

interface Props {
  show?: boolean;
  active: number;
  dispatch: (arg0: any) => any;
}
/**显示tabbar的页面路径集合 */
export type Pages = Array<string>;

export default connect((state: any) => state.tabbar)(
  class GlobalTabbar extends Component<Props> {
    pushHome = (): any => {
      this.props.dispatch(
        routerRedux.push({
          pathname: '/',
        }),
      );
      this.props.dispatch({
        type: 'tabbar/setActive',
        payload: 0,
      });
    };
    pushOrder = (): any => {
      this.props.dispatch(
        routerRedux.push({
          pathname: '/order',
        }),
      );
      this.props.dispatch({
        type: 'tabbar/setActive',
        payload: 2,
      });
    };

    render() {
      const homeIcon = <img src={require('../assets/tabbar/home@2x.png')} />;
      const homeSelectIcon = <img src={require('../assets/tabbar/home_active@2x.png')} />;
      const financeIcon = <img src={require('../assets/tabbar/finance@2x.png')} />;
      const financeSelectIcon = <img src={require('../assets/tabbar/finance_active@2x.png')} />;
      const orderIcon = <img src={require('../assets/tabbar/order@2x.png')} />;
      const orderSelectIcon = <img src={require('../assets/tabbar/order_active@2x.png')} />;
      const myIcon = <img src={require('../assets/tabbar/my@2x.png')} />;
      const mySelectIcon = <img src={require('../assets/tabbar/my_active@2x.png')} />;
      return (
        <TabBar tabBarPosition="bottom" hidden={!this.props.show}>
          <TabBarItem
            icon={homeIcon}
            selectedIcon={homeSelectIcon}
            title="首页"
            key={0}
            onPress={this.pushHome}
            selected={this.props.active === 0}
          >
            {this.props.children}
          </TabBarItem>
          <TabBarItem
            icon={financeIcon}
            selectedIcon={financeSelectIcon}
            title="财务"
            key={1}
            selected={this.props.active === 1}
          >
            {this.props.children}
          </TabBarItem>
          <TabBarItem
            icon={orderIcon}
            selectedIcon={orderSelectIcon}
            title="订单"
            onPress={this.pushOrder}
            key={2}
            selected={this.props.active === 2}
          >
            {this.props.children}
          </TabBarItem>
          <TabBarItem
            icon={myIcon}
            selectedIcon={mySelectIcon}
            title="我的"
            key={3}
            selected={this.props.active === 3}
          >
            {this.props.children}
          </TabBarItem>
        </TabBar>
      );
    }
  },
);
