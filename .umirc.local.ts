import { IConfig } from "umi-types";

const config: IConfig = {
  define: {
    // "window.api": "http://test.api.supplier.tdianyi.com/",
    "window.api": "http://release.api.supplier.tdianyi.com/",
    "window.speaker_api": "http://test.api.voice.tdianyi.com/",
    "window.open_id": "test_open_id",
    "window.url": "http://test.api.tdianyi.com/",
    "window.from": "http://test.supplierv2.tdianyi.com/",
    "window.pay_url": "http://test.api.tdianyi.com/payCentre/toSupplierWxPay",
    "window.shareLink": "http://test.mall.tdianyi.com/",
    "window.service_url": "http://test.mall.tdianyi.com/#/pages/mycardticket/index",
    "Environment": "test"
  },
}
export default config
