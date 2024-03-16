import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const setUser = (user) => {
    setUserData(user);
  };

  const updateUser = (updatedUserData) => {
    setUserData({ ...userData, ...updatedUserData });
  };

  const refreshGroceryList = async () => {
    if (userData) {
      try {
        const response = await axios.get(`http://192.168.8.101:5000/grocery/${userData.user_id}`);
        // Assuming the response contains the updated grocery items
        // Update the grocery items in the context
        // For example, setGroceryItems(response.data.grocery_items);
      } catch (error) {
        console.error('Error refreshing grocery list:', error);
      }
    }
  };
  
  // Load user data from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user_profile');
        
        if (userJson) {
          const user = JSON.parse(userJson);
          setUserData(user);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUser, updateUser, refreshGroceryList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
