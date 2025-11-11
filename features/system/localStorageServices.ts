import AsyncStorage from '@react-native-async-storage/async-storage';

export const reduxStorage = {
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('AsyncStorage setItem error: ', error);
    }
  },
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (error) {
      console.error('AsyncStorage getItem error: ', error);
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage removeItem error: ', error);
    }
  },
};
