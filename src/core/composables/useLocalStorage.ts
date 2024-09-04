import { TableStorage } from "@/types";

export const useLocalStorage = (): { storage: any } => {
  const storage = {
    getItem<T>(table: TableStorage, key: string): Promise<T | undefined> {
      return new Promise(resolve => {
        const KEY = `${table}.${key}`;
        const itemStr = window.localStorage.getItem(KEY);
        // console.log(itemStr, 'itemStr...');
        try {
          const result = JSON.parse(itemStr);
          resolve(result as T);
        } catch (error) {
          resolve(undefined);
        }
      });
    },
    setItem<T>(table: TableStorage, key: string, value: T) {
      return new Promise(resolve => {
        const KEY = `${table}.${key}`;
        window.localStorage.setItem(KEY, JSON.stringify(value));
        resolve(true);
      });
    },
    removeItem(table: TableStorage, key: string) {
      return new Promise(resolve => {
        const KEY = `${table}.${key}`;
        window.localStorage.removeItem(KEY);
        resolve(true);
      });
    },
    clear() {
      return new Promise(resolve => {
        window.localStorage.clear();
        resolve(true);
      });
    }
  };

  return {
    storage,
  };
};