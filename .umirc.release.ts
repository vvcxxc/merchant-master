import { IConfig } from "umi-types";

const config: IConfig = {
  define: {
    "window.api": "http://release.api.supplier.tdianyi.com/",
    "window.open_id": "open_id",
    "window.url": "http://release.api.supplier.tdianyi.com/",
    "window.from": "http://release.supplierv2.tdianyi.com/",
    "window.pay_url": "http://release.api.tdianyi.com/payCentre/toSupplierWxPay"
  }
}

export default config
