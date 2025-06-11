import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../context/AuthContext';

type LoginFormInputs = {
  username: string;
  password: string;
};

type LoginScreenProps = {
  onLogin: (data: LoginFormInputs) => void;
};

const LoginCard: React.FC<LoginScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit =  async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://crmss.naffco.com/crmss/security/login.aspx/GetUserDetails',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName : data.username,
            Password : data.password,
          }),
        }
      );

      const loginResponse = await response.json();

      if (response.ok && loginResponse?.d) {
    // Use loginResponse.d directly without parsing
    const userDetails = loginResponse.d[0];
    if(userDetails) {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
    setIsLoggedIn(true);
      } else {
        setErrorMessage(
          loginResponse?.message || 'Invalid username or password'
        );      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.naffco.com/media/NaffcoLoginBackground.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>E-connect Naffco</Text>

          {/* Username Input */}
          <Controller
            control={control}
            name="username"
            rules={{ required: 'Username is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.username && styles.errorInput]}
                placeholder="Username"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
            {errorMessage && (
            <Text style={styles.serverErrorText}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    width: '100%',
    height: '100%',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b01c12', // Naffco brand red
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: '#b01c12', // Highlight border on error
  },
  errorText: {
    color: '#b01c12',
    marginBottom: 10,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#b01c12', // Naffco brand red
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serverErrorText: {
    color: '#b01c12',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginCard;
