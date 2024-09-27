import { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';

export const useStorage = () => {
  const [store, setStore] = useState<Storage | null>(null);

  // Initialize storage
  useEffect(() => {
    const initStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStore(storage);
    };
    initStorage();
  }, []);

  // Function to save user data
  const saveUserData = async (key: string, value: string) => {
    if (store) {
      await store.set(key, value);
      console.log('User data saved!');
    }
  };

  // Function to retrieve user data
  const loadUserData = async (key: string) => {
    if (store) {
      const data = await store.get(key);
      return data;
    }
    return null;
  };

  const clearAllData = async() => {
    if (store) {
      await store.clear();
    }
  }

  return { store, saveUserData, loadUserData, clearAllData }; // Return store
};
