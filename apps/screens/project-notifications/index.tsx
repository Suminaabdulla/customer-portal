import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ProjectHeader from '../../views/project-chat/components/Header';
import ProjectNotificationManagement from '../../views/project-notification';

const ProjectNotificationScreen = ({ route, navigation }) => {
  const { project } = route.params;

  useEffect(() => {
    if (project) {
      // Set the custom header with the project name and image
      navigation.setOptions({
        title: project.ProjectName,
      });
    }
  }, [navigation, project]);

  return (
    <View style={styles.container}>
      <ProjectNotificationManagement project={project}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default ProjectNotificationScreen;
