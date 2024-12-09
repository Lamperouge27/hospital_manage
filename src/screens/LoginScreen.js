import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SecureStore from '../utils/secureStorage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const storedEmail = await SecureStore.get('userEmail');
    const storedPassword = await SecureStore.get('userPassword');
    
    if (email === storedEmail && password === storedPassword) {
      await SecureStore.save('userToken', 'dummyToken');
      await SecureStore.save('userRole', 'user');

      navigation.navigate('DashboardScreen');
    } else {
      Alert.alert('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.adminContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminLoginScreen')}>
          <Text style={styles.adminLink}>ADMIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  loginButton: {
    backgroundColor: '#2E3B4E',
    borderRadius: 25,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#333',
  },
  registerLink: {
    color: '#2E3B4E',
    fontWeight: 'bold',
  },
  adminContainer: {
    marginTop: 20,
  },
  adminLink: {
    color: '#2E3B4E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
