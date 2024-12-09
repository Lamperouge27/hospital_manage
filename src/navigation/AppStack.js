import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SecureStore from '../utils/secureStorage';
import DashboardScreen from '../screens/DashboardScreen';
import BScreen from '../screens/BScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import DoctorDashboard from '../DoctorDashboard';
import StaffDashboard from '../screens/StaffDashboard';
import AppointmentApprovalScreen from './AppointmentApprovalScreen'; 

const Stack = createStackNavigator();

export default function AppStack({ setIsAuthenticated }) {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
      const fetchUserRole = async () => {
        const role = await SecureStore.get('userRole'); // Fetch saved role
        setUserRole(role || 'patient'); // Default to 'patient' if no role is found
      };
      fetchUserRole();
    }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard">
      <Stack.Screen name="Booking" component={BScreen} />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Stack.Screen name="StaffDashboard" component={StaffDashboard} />
      <Stack.Screen name="AppointmentApprovalScreen" component={AppointmentApprovalScreen} />
        {(props) => (
          <DashboardScreen {...props} userRole={userRole} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
