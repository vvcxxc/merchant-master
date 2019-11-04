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
      // 可以充当路由守卫，每次路由变化会触发
      // console.log('触发了')
      window.onerror = function(msg, url, line, col, error){
        if(error){
          console.log(error)
          console.log(error.message)
          alert('有错')
          const pattern = /Loading chunk (\d)+ failed/g;
          const isChunkLoadFailed = error.message.match(pattern);
          console.log(isChunkLoadFailed)
          alert(isChunkLoadFailed)
          if(isChunkLoadFailed) {
            alert('报错')
            location.reload()
            console.log('触发了')
          }
        }
      }
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
