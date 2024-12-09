import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import SecureStore from '../utils/secureStorage';

const ProfileEditorScreen = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedName = await SecureStore.get('userName');
        setName(storedName || '');
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile data.');
      }
    };

    loadProfileData();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please fill in your name.');
      return;
    }

    try {
      await SecureStore.save('userName', name);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile data.');
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your name?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await SecureStore.delete('userName');
              setName('');
              Alert.alert('Success', 'Profile name has been deleted.');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete profile data.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        placeholderTextColor="#A0A0A0"
        value={name}
        onChangeText={setName}
      />

      <Button label="Save Changes" onPress={handleSave} color="#2E3B4E" />
      <Button label="Delete Name" onPress={handleDelete} color="#D9534F" />
    </View>
  );
};

const Button = ({ label, onPress, color, textColor = '#FFF' }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 45,
    width: '100%',
    maxWidth: 300,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  button: {
    borderRadius: 25,
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileEditorScreen;
