import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';

declare global {
  interface String {
    replaceAllCustom(oldStr: string, newStr: string): string;
  }
}
String.prototype.replaceAllCustom = function (oldStr: string, newStr: string): string {
  if (typeof this === 'string' || this instanceof String) {
    return this.split(oldStr).join(newStr);
  }
  return '';
};

export function removeVietnameseAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export const maskAddressCoin = (address: string) => {
  if (address.length < 12) return address;
  const left = address.slice(0, 6);
  const right = address.slice(-6);
  return `${left}....${right}`;
};

const DEVICE_ID_KEY = 'notic_device_id';
const SERVICE_NAME = 'notic_device_id_service';

export const handleDeviceIdStorage = async (): Promise<string> => {
  const credentials = await Keychain.getGenericPassword({ service: SERVICE_NAME });
  if (credentials) {
    return credentials.password;
  } else {
    const uniqueId = await DeviceInfo.syncUniqueId();
    await Keychain.setGenericPassword(DEVICE_ID_KEY, uniqueId, {
      service: SERVICE_NAME,
    });
    return uniqueId;
  }
};
