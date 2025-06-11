import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import '../gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

// import 'react-native-gesture-handler'
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" // Set text color (light-content or dark-content)
        backgroundColor="#b01c12" // Set background color for Android
        translucent={false} // Make the status bar opaque
      />
        <AuthProvider>
        <AppNavigator />

        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
