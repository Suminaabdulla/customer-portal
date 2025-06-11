import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // To access navigation
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const ProjectHeader = ({ projectName = '', imageSource = '', navigateToProjectDetails = () => {}, projectOwner = '', navigateToProjectUpdates = () => {} }) => {
  const navigation = useNavigation();

  // const navigateToProjectDetails = () => {
  //   navigation.navigate('ProjectDetails');
  // };

  return (
    <TouchableOpacity style={styles.headerContainer} onPress={navigateToProjectDetails} activeOpacity={0.7}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      {/* Image centered in the header */}
      <View style={{width:'100%', alignItems:'center'}}>
      <Image source={imageSource} style={styles.image} resizeMode='cover'
      />
              <View style={styles.overlay} />

      {/* Project name centered below the image */}
      <View style={styles.textOverlay}>
      <Text style={styles.headerText}>{projectName}</Text>
      <Text style={{...styles.headerText, ...{fontSize:14, fontWeight:'medium'}}}>{projectOwner}</Text>
      </View>
  
      <TouchableOpacity style={styles.notificationIcon} onPress={navigateToProjectUpdates}>
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
    backgroundColor: '#fff',
    // paddingTop: 30,
    elevation:2,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,  // Make sure it appears above other elements
  },
  image: {
    width: '100%',  // Dummy image size
    height: 300,
    // borderRadius:10,
    // marginVertical: 20,  // Space between the image and the text
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',  // Light grey color
    elevation: 2,
    padding: 10,  // Add some padding to make the text more readable
    shadowColor: '#000',  // For iOS shadow color
    shadowOffset: { width: 0, height: -2 },  // Shadow offset
    shadowOpacity: 0.25,  // Shadow opacity
    shadowRadius: 4,  // Shadow blur radius,
    paddingHorizontal:20
  },  
  notificationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 25,
    position:'absolute',
    right:0
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,  // Adds space between the icon and text
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent black
    zIndex: 0, // Ensure the overlay is beneath the text and icon
  },
});

export default ProjectHeader;
