import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ProjectHeader from '../../views/project-chat/components/Header';
import ProjectDetailsManagement from '../../views/project-details';

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { project } = route.params;

  const navigateToProjectUpdates = () => navigation.navigate('ProjectNotification',  { project });
  useEffect(() => {
    if (project) {
      // Set the custom header with the project name and image
      navigation.setOptions({
        header: () => (
          <ProjectHeader
            projectName={project.ProjectName}
            projectOwner={project.Owner}
            imageSource={{ uri: project?.ImageURL }}
            navigateToProjectUpdates={navigateToProjectUpdates}
          />
        ),
      });
    }
  }, [navigation, project]);

  return (
    <View style={styles.container}>
      <ProjectDetailsManagement project={project}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default ProjectDetailsScreen;
