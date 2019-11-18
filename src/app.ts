import * as Sentry from '@sentry/browser';
// ref: https://umijs.org/config/
declare const Environment:string
if (Environment == 'test' || Environment == 'release' || Environment == 'master'){
  Sentry.init({
    dsn: "http://256d89d4fb9243008db86e5039ecbf41@sentry.tdianyi.com/3",
    environment: Environment
  });
}
import Vconsole from 'vconsole'

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

// if(process.env.NODE_ENV != '')
const vConsole = new Vconsole()

/**路由变化 */
export const onRouteChange = (params: { location: any, routes: any }) => {
  // console.log(params)
  try {
    const defaultTitle = '小熊敬礼'
    const path = params.location.pathname
    const routerConfig = params.routes[0].routes
    const router = routerConfig.find((_: any) => _.path === path)
    /**fix: 展位广告区分阶段 */
    if (router.path === '/ad/other-page') {
      window.title = decodeURI(window.location.search).split('=')[1]
    }
    else if (router.path === '/finance/financeDetail/list') {
      let _type = decodeURI(window.location.search).split('type=')[1]
      switch (_type) {
        case "1": { document.title = "线下收银"; window.title = "线下收银" } break;
        case "2": { document.title = "费率返点"; window.title = "费率返点" } break;
        case "3": { document.title = "广告收益"; window.title = "广告收益" } break;
        case "4": { document.title = "优惠券收益"; window.title = "优惠券收益" } break;
        case "5": { document.title = "线上卖券"; window.title = "线上卖券" } break;
        case "6": { document.title = "广告支出"; window.title = "广告支出" } break;
        default: return
      }
    }
    else {
      window.title = router.title || defaultTitle
    }

  } catch (e) {
    throw new Error(e)
  }
}
