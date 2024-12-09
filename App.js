import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { BookingContextProvider } from './src/screens/BookingContext';

export default function App() {
  return (
    <BookingContextProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </BookingContextProvider>
  );
}
