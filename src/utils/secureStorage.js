import * as SecureStore from 'expo-secure-store';

export default {
  // Save an item to SecureStore
  save: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Error saving item with key ${key}:`, error);
    }
  },

  // Retrieve an item from SecureStore
  get: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;  // Return the retrieved value
    } catch (error) {
      console.error(`Error retrieving item with key ${key}:`, error);
      return null;  // Return null if retrieval fails
    }
  },

  // Delete an item from SecureStore
  delete: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Error deleting item with key ${key}:`, error);
    }
  },
};
