import React, { useEffect, useState } from 'react';
import { Text, View, Button, Alert, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  StackActions, useNavigation } from '@react-navigation/native';
import withAnimatedHeader from '../../layout/header/AnimatedHeader';
import { useAuth } from '../../context/AuthContext';

const SettingsScreen = ({}) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await AsyncStorage.getItem('userDetails');
        if (user) {
          try {
            const parsedUser = JSON.parse(user);
            setUserDetails(parsedUser);
          } catch (error) {
            console.error('Error parsing user details:', error);
            setUserDetails(null);
          }
        }
      } catch (error) {
        console.error('Error retrieving user details from AsyncStorage:', error);
        setUserDetails(null);
      }
    };

    getUserDetails();
  }, []);
  const { setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('userDetails');
  
        
        setIsLoggedIn(false); // Update the global authentication state

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetailsContainer}>
        {userDetails ? (
          <>
            <Image
              source={{ uri: userDetails.ImageURL }}
              style={styles.profileImage}
            />
            <Text style={styles.userDetailText}>Name: {userDetails.EmpName}</Text>
            <Text style={styles.userDetailText}>Employee No: {userDetails.EmpNo}</Text>
          </>
        ) : (
          <Text style={styles.noUserText}>No user details found</Text>
        )}
      </View>

      {/* Logout button at the bottom */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#b01c12" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // This ensures the logout button is at the bottom
    padding: 20,
  },
  userDetailsContainer: {
    alignItems: 'center',
    flex: 1,  // Allows the user details container to take up available space
    justifyContent: 'center',  // Centers the content vertically
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userDetailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  noUserText: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButtonContainer: {
    marginTop: 20,
    paddingBottom: 20, // Adds some space at the bottom
  },
});

const SettingsWithHeader = withAnimatedHeader(SettingsScreen);
export default SettingsWithHeader;
