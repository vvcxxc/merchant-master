import { IConfig } from "umi-types";

const config: IConfig = {
  define: {
    "window.api": "http://test.api.supplier.tdianyi.com/",
    "window.open_id": "test_open_id",
    "window.url": "http://test.api.tdianyi.com/",
    "window.from": "http://test.supplierv2.tdianyi.com/",
    "window.pay_url": "http://test.api.tdianyi.com/payCentre/toSupplierWxPay"
  }
}
export default config
