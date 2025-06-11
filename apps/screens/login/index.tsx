import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginManagement from '../../views/login';

const LoginScreen = ({onLogin}) => {

  return (
    <View style={styles.container}>
      <LoginManagement onLogin={onLogin}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default LoginScreen;
