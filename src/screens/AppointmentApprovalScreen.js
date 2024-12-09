import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { BookingContext } from './BookingContext'; 
import SecureStore from '../utils/secureStorage';
import { useNavigation } from '@react-navigation/native';

export default function AppointmentApprovalScreen() {
  const { bookings, updateBookingStatus } = useContext(BookingContext);
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserName = async () => {
      const storedName = await SecureStore.get('userName'); 
      setUserName(storedName || ''); 
    };

    loadUserName();
  }, []);

  const updateAppointmentStatus = (id, status) => {
    updateBookingStatus(id, status);
    const message =
      status === 'Approved'
        ? 'Your appointment has been approved!'
        : 'Your appointment has been rejected.';
    Alert.alert('Appointment Status', message);
  };

  const handleApprove = (id) => {
    updateAppointmentStatus(id, 'Approved');
  };

  const handleReject = (id) => {
    updateAppointmentStatus(id, 'Rejected');
  };

  const handleLogoutConfirmation = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => {
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              Alert.alert('Logged Out', 'You have successfully logged out.');
              navigation.navigate('Login'); 
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Logout Failed', 'There was an error logging out.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.doctor}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>
      <Text style={styles.time}>Time: {item.slot}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.userName}>Booked by: {userName}</Text>
      <View style={styles.buttons}>
        <Button
          title="Approve"
          onPress={() => handleApprove(item.id)}
          disabled={item.status !== 'Pending'}
        />
        <Button
          title="Reject"
          onPress={() => handleReject(item.id)}
          color="red"
          disabled={item.status !== 'Pending'}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Appointments</Text>
      <FlatList
        data={bookings.filter(booking => booking.status === 'Pending')}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogoutConfirmation} color="#2E3B4E" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333',
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    marginBottom: 15, 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 4, 
  },
  doctorName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: '#333', 
  },
  date: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 4,
  },
  time: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 8,
  },
  status: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 12,
  },
  userName: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 12,
    fontStyle: 'italic',
  },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  logoutButton: {
    marginTop: 20,
  },
});
