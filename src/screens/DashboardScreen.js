import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookingHistoryScreen from './BookingHistoryScreen';
import AdminDashboard from './AdminLoginScreen';
import BookingScreen from './BookingScreen';
import LogoutScreen from './LogoutScreen';
import { useNavigation } from '@react-navigation/native';
import ProfileEditorScreen from './ProfileEditorScreen';

const Dashboard = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', label: 'Dashboard' },
    { name: 'BookingScreen', label: 'Booking' },
    { name: 'BookingHistoryScreen', label: 'Booking History' },
    { name: 'Profile', label: 'Profile Editor' },
    { name: 'Logout', label: 'Logout' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogoutConfirmation = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => setIsSidebarOpen(false),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('LogoutScreen'),
        },
      ],
      { cancelable: false }
    );
  };

  const handleNavigation = (screen) => {
    if (screen === 'Logout') {
      handleLogoutConfirmation();
    } else {
      setCurrentScreen(screen);
      setIsSidebarOpen(false);
    }
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return (
          <View>
            <Text style={styles.header}>Welcome to ICARE</Text>
            <View style={styles.overview}>
              <DashboardBox title="ICARE Appointment Manager is a user-friendly mobile application designed to streamline medical appointment bookings. Patients can view available doctors, select appointment slots, and track booking history. The app includes features like profile management, admin approval for bookings, and seamless navigation through an intuitive dashboard. Perfect for enhancing efficiency in healthcare services." />
            </View>
            <View style={styles.overview}>
              <DashboardBox title="This app excels with its user-friendly design, seamless navigation, and comprehensive features for patients and administrators. It integrates essential functions like appointment booking, profile management, and booking history in one platform, ensuring a smooth and personalized user experience. The admin dashboard enhances operational efficiency, while secure data handling and responsive design prioritize reliability. By combining functionality, clarity, and user-centric features, the app offers a superior solution for managing healthcare appointments compared to competitors." />
            </View>
          </View>
        );
      case 'Admin':
        return <AdminDashboard />;
      case 'BookingScreen':
        return <BookingScreen />;
      case 'BookingHistoryScreen':
        return <BookingHistoryScreen />;
      case 'Profile':
        return <ProfileEditorScreen />;
      case 'LogoutScreen':
        return <LogoutScreen />;
      default:
        return (
          <Text style={styles.errorText}>Screen not found! Please try again.</Text>
        );
    }
  };

  return (
    <View style={styles.dashboardContainer}>
      {isSidebarOpen && (
        <View style={styles.dropdown}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sidebarItem}
              onPress={() => handleNavigation(item.name)}
            >
              <Text style={styles.sidebarItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>ICARE</Text>
          <TouchableOpacity style={styles.iconButton} onPress={toggleSidebar}>
            <Icon name="more-vert" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        {renderActiveScreen()}
      </ScrollView>
    </View>
  );
};

const DashboardBox = ({ title, number }) => (
  <View style={styles.box}>
    <Text style={styles.boxTitle}>{title}</Text>
    <Text style={styles.number}>{number}</Text>
  </View>
);

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  sidebar: {
    width: '100%',
    backgroundColor: '#2E3B4E',
    paddingTop: 20,
    paddingLeft: 15,
    zIndex: 1,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 10,
  },
  sidebarTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    paddingRight: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#2E3B4E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    zIndex: 100,
    elevation: 10,
  },
  sidebarItem: {
    paddingVertical: 12,
    marginBottom: 10,
  },
  sidebarItemText: {
    color: 'white',
    fontSize: 16,
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  overview: {
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    maxWidth: 250,
  },
  boxTitle: {
    fontSize: 16,
    color: '#666',
  },
  number: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Dashboard;
