import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        Alert.alert('Logged Out', 'You have successfully logged out.');
        
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error clearing SecureStore:', error);
        Alert.alert('Logout Failed', 'There was an error logging out.');
      }
    };

    logoutUser();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging you out...</Text>
    </View>
  );
};

export default LogoutScreen;
