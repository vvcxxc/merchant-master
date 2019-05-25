import { Model } from 'dva';

const model: Model = {
  namespace: 'tabbar',
  state: {
    active: 0,
    show: false,
    pages: ['/', '/order'],
  },
  reducers: {
    setShow(state, { payload }) {
      return {
        ...state,
        /**根据路由判断是否显示tabbar */
        show: !!state.pages.find((_: any) => _ === payload),
      };
    },
    setActive(state, { payload }) {
      return {
        ...state,
        active: payload,
      };
    },
    setPages(state, { payload }) {
      return {
        ...state,
        pages: payload,
      };
    },
  },
  subscriptions: {
    history({ dispatch, history }) {
      dispatch({
        type: 'setShow',
        payload: history.location.pathname,
      });
    },
  },
};

export default model;
