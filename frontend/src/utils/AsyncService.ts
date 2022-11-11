import AsyncStorage from '@react-native-async-storage/async-storage';

// export const storeData = async (key: string, value: any) => {
//   try {
//     const stringValue = JSON.stringify(value);
//     console.log('12312312', stringValue);
//     await AsyncStorage.setItem(key, stringValue);
//   } catch (e: any) {
//     console.error(e.message);
//   }
// };
export const storeData = async (key: string, value: any) => {
  // console.log(value);
  try {
    const svalue = JSON.stringify(value);
    console.log(svalue);
    await AsyncStorage.setItem(key, svalue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  // console.log('key', key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.error('removeDataError', e.message);
  }
};
export const removeMultiple = async (keys: string[]) => {
  try {
    keys.forEach(elem => {
      AsyncStorage.removeItem(elem);
    });
  } catch (e: any) {
    console.log('remnoveMultipleError', e.message);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e: any) {
    console.error(e.message);
  }
};
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
};

// return list of values that parsed 아 이거 맞냐 진짜...
export const getMultiple = async (keys: string[]) => {
  try {
    const returns: Array<any> = ['1'];
    const pairs = await AsyncStorage.multiGet(keys);
    if (pairs.length >= 1) {
      pairs.forEach(pair => {
        if (pair[1] != null) {
          returns.push(JSON.parse(pair[1]));
        }
      });
    }
    return returns;
  } catch (e: any) {
    console.error(e.message);
    console.log('에러야?');
  }
};
