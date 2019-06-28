declare global {
  interface Window {
    /**页面标题 */
    title: string
  }
}
export const dva = {
  config: {
    onError(err: ErrorEvent, dispatch: any) {
      err.preventDefault();
    }
  }
};

/**路由变化 */
export const onRouteChange = (params: { location: any, routes: any }) => {
  try {
    const defaultTitle = '团卖物联'
    const path = params.location.pathname
    const routerConfig = params.routes[0].routes
    const router = routerConfig.find((_: any) => _.path === path)
    /**fix: 展位广告区分阶段 */
    if (router.path === '/ad/other-page') {
      window.title = decodeURI(window.location.search).split('=')[1]
    } else {
      window.title = router.title || defaultTitle
    }

  } catch (e) {
    throw new Error(e)
  }
}
