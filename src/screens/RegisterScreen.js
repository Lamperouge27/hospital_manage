import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SecureStore from '../utils/secureStorage'; 

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    if (!name.trim()) {
      Alert.alert('Invalid Name', 'Name cannot be empty.');
      return;
    }

    try {
      await SecureStore.save('userName', name);
      await SecureStore.save('userEmail', email);
      await SecureStore.save('userPassword', password);

      Alert.alert('Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      
      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  input: { 
    height: 45, 
    width: '100%',
    borderColor: '#D1D1D1', 
    borderWidth: 1, 
    borderRadius: 25, 
    marginBottom: 15, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    backgroundColor: '#F8F8F8',
  },
  button: {
    backgroundColor: '#2E3B4E',
    borderRadius: 25,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold'
  },
  bottomContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#2E3B4E', 
    fontWeight: 'bold',
  },
});
