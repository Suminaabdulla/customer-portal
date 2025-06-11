import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import LoginCard from './components/LoginCard';

const LoginManagement = ({ onLogin }) => {
  return (
    <ImageBackground
      source={{
        uri: 'https://naffco.zendesk.com/embeddable/avatars/17178862226333',
      }}
      style={styles.background}
      resizeMode="cover" // Ensures the image covers the entire screen
    >
      <View style={styles.overlay}>
        <LoginCard onLogin={onLogin} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoginManagement;
