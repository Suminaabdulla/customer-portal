import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProjectCard: React.FC = ({ project  }) => {
    const navigation = useNavigation();  // Access the navigation object

    const goToProjectList = () => {
        // Navigate to the ProjectListScreen
        navigation.navigate('ProjectChat', { project });
      };
  return (
    <TouchableOpacity style={styles.card} onPress={goToProjectList}>
      <Image
        style={styles.image}
        source={{
          uri: project?.ImageURL
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{project.ProjectName}</Text>
        <Text style={styles.location}>{project.Owner}</Text>
      </View>
    </TouchableOpacity>
  );
};
// {"d": [{"Company": "Abu Dhabi", "ID": null, "ImageURL": "", "MEPConsultant": "No Consultant.", "MEPContractor": null, "MainContractorName": "", "Owner": "TAHA HANIYA", "Priority": null, "ProjectName": "TEST", "ProjectNo": "1100764336", "ProjectStatus": "NO_SALE", "Remarks": null, "Stage": "Tender", "__type": "CRMAdmin_SteeringCommittee+TableDetails"}]}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    paddingHorizontal: 15
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProjectCard;
