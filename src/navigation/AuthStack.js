import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';  // Ensure path is correct
import RegisterScreen from '../screens/RegisterScreen';  // Ensure path is correct
import DashboardScreen from '../screens/DashboardScreen';  // Ensure path is correct
import BookingScreen from '../screens/BookingScreen';
import AppointmentApprovalScreen from '../screens/AppointmentApprovalScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import ProfileEditorScreen from '../screens/ProfileEditorScreen';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AdminLoginScreen" component={AdminLoginScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="AppointmentApprovalScreen" component={AppointmentApprovalScreen} />
      <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
