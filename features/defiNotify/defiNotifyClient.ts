import AxiosClient, { paramsToUrl } from '@/app/api/axios/AxiosClient';

// config.ts
const urlApi = {
  getServices: 'get_services',
  getChains: 'get_chains',
  getPlatformByChain: 'get_platform_by_chain',
  getFrequencies: 'get_frequencies',
  getAlertThresholdByPlatform: 'get_alert_threshold_by_platform',
  register: 'insert_order',
  getOrderList: 'get_order_info',
  changeOrder: 'change_order',
  notify: 'notifyonoff_order',
  renewOrder: 'renew_order',
  updateOrder: 'update_order',
  deleteOrder: 'delete_order',
  getPaymentByOrder: 'get_payment_info',
  updateLastAccessPayment: 'update_last_access_payment',
  googlePayCharge: 'googlePayCharge',
  getSettingInfo: 'get_setting_info',
  updateSetting: 'update_setting',
};

// type.ts
export interface IGetPlatformByChain {
  chain: string;
}
export interface IGetPaymentByOrder {
  order_no: string;
}
export interface IGetAlertThresholdByPlatform {
  platform: string;
}

export interface IRegisterRequest {
  wallet_address: string;
  fcm_token: string;
  device_id: string;
  service: string;
  frequency: number;
  chain: string;
  platform: string;
  alert_threshold: string;
}

export interface IGetOrderList {
  device_id: string;
}

export interface IGetSettingInfo {
  device_id: string;
}

export interface IRenewOrder {
  device_id: string;
  order_no: string;
  cex?: boolean;
}

export interface IUpdateOrder {
  device_id: string;
  fcm_token: string;
}
export interface IDeleteOrder {
  order_no: string;
}

export interface INotify {
  onoff: number;
  device_id: string;
  order_no: string;
  cex?: boolean;
}

export interface IChangeOrder {
  device_id: string;
  order_no: string;
  pool_name: string;
  new_alert: string;
  frequency: string;
}

export interface IUpdateLastAccessPayment {
  order_no: string;
  period: number;
  total_value: number;
}
export interface IGooglePayCharge {
  payment_method: string[];
  amount: number;
}

export interface IUpdateSetting {
  device_id: string;
  is_testnet: number;
}

export default class DefiNotifyClient extends AxiosClient {
  getChains() {
    return super.get(urlApi.getChains, null);
  }
  getServices() {
    return super.get(urlApi.getServices, null);
  }
  getPlatformByChain(req: IGetPlatformByChain) {
    return super.get(`${urlApi.getPlatformByChain}${paramsToUrl(req)}`, null);
  }
  getFrequencies() {
    return super.get(urlApi.getFrequencies, null);
  }
  getAlertThresholdByPlatform(req: IGetAlertThresholdByPlatform) {
    return super.get(`${urlApi.getAlertThresholdByPlatform}${paramsToUrl(req)}`, null);
  }
  register(req: IRegisterRequest) {
    return super.post(urlApi.register, req);
  }
  getOrderList(req: IGetOrderList) {
    return super.get(`${urlApi.getOrderList}${paramsToUrl(req)}`, null);
  }
  renewOrder(req: IRenewOrder) {
    return super.post(urlApi.renewOrder, req);
  }
  changeOrder(req: IChangeOrder) {
    return super.post(urlApi.changeOrder, req);
  }
  notify(req: INotify) {
    return super.post(urlApi.notify, req);
  }
  updateOrder(req: IUpdateOrder) {
    return super.post(urlApi.updateOrder, req);
  }
  getPaymentByOrder(req: IGetPaymentByOrder) {
    return super.get(`${urlApi.getPaymentByOrder}${paramsToUrl(req)}`, null);
  }
  updateLastAccessPayment(req: IUpdateLastAccessPayment) {
    return super.post(urlApi.updateLastAccessPayment, req);
  }
  googlePayCharge(req: IGooglePayCharge) {
    return super.post(urlApi.googlePayCharge, req);
  }
  getSettingInfo(req: IGetSettingInfo) {
    return super.get(`${urlApi.getSettingInfo}${paramsToUrl(req)}`, null);
  }
  updateSetting(req: IUpdateSetting) {
    return super.post(urlApi.updateSetting, req);
  }
  deleteOrder(req: IDeleteOrder) {
    return super.post(urlApi.deleteOrder, req);
  }
}
