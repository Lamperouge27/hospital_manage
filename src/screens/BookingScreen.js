import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { BookingContext } from './BookingContext';
import SecureStore from '../utils/secureStorage';

const BookingScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [profileUpdated, setProfileUpdated] = useState(false); 
  const { addBooking } = useContext(BookingContext);

  useEffect(() => {
    const checkProfile = async () => {
      const lname = await SecureStore.get('userName');
      setProfileUpdated(!!lname);
    };

    checkProfile();

    setDoctors([
      { id: '1', name: 'Dr. Smith', specialization: 'Cardiologist', availableSlots: ['10:00 AM', '2:00 PM'] },
      { id: '2', name: 'Dr. Adams', specialization: 'Dermatologist', availableSlots: ['9:00 AM', '4:00 PM'] },
      { id: '3', name: 'Dr. Dave', specialization: 'Dentist', availableSlots: ['8:00 AM', '2:00 PM'] },
    ]);
  }, []);

  const confirmBooking = (doctor, slot) => {
    if (!profileUpdated) {
      Alert.alert(
        'Profile Incomplete',
        'Please update your profile before booking an appointment.'
      );
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      doctor: doctor.name,
      specialization: doctor.specialization,
      slot,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
    };

    addBooking(newBooking);
    Alert.alert('Booking Confirmed', 'Your appointment has been booked. Please wait for admin approval.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>ICARE Doctors</Text>
      <ScrollView contentContainerStyle={styles.listContent}>
        <Text style={styles.subHeader}>Choose your preferred doctor and slot:</Text>
        {doctors.map((doctor) => (
          <View key={doctor.id} style={styles.card}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialization}>Specialization: {doctor.specialization}</Text>
            <Text style={styles.availableSlots}>Available Slots:</Text>
            {doctor.availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={`${doctor.id}-${index}`}
                style={styles.slotButton}
                onPress={() => confirmBooking(doctor, slot)}
              >
                <Text style={styles.slotText}>Book {slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#555',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 4,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specialization: {
    fontSize: 14,
    marginBottom: 10,
  },
  availableSlots: {
    fontSize: 14,
    marginBottom: 10,
  },
  slotButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 8,
    alignItems: 'center',
  },
  slotText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
