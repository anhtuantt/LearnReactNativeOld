import { baseApiUrl } from '@/configs/envConfigs';
import {
  DefiNotifyRequest,
} from './requests';
const defiNotifyRequest = new DefiNotifyRequest(baseApiUrl);
export {
  defiNotifyRequest,
};
