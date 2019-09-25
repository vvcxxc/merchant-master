import { Model } from 'dva';

const model: Model = {
  namespace: 'tabbar',
  state: {
    active: 0,
    show: false,
    pages: ['/', '/finance', '/order', '/my'],
  },
  reducers: {
    setShow(state, { payload }) {
      const index = state.pages.findIndex((_: any) => _ === payload);
      return {
        ...state,
        /**根据路由判断是否显示tabbar */
        show: index > -1,
        active: index,
      };
    },
    // setActive(state, { payload }) {
    //   return {
    //     ...state,
    //     active: payload,
    //   };
    // },
    // setPages(state, { payload }) {
    //   return {
    //     ...state,
    //     pages: payload,
    //   };
    // },
  },
  subscriptions: {
    history({ dispatch, history }) {
      let url = location.href;
      sessionStorage.setItem('url', url)
      
      history.listen(() =>
        dispatch({
          type: 'setShow',
          payload: history.location.pathname,
        }),
      );
    },
  },
};

export default model;
