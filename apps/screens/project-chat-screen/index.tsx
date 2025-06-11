import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ProjectChatManagement from '../../views/project-chat';
import ProjectHeader from '../../views/project-chat/components/Header';

const ProjectChatScreen = ({ route, navigation }) => {
  const { project } = route.params;
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: 'none'
  //     }
  //   });
  //   return () => {
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: {
  //         display: 'flex'
  //       }
  //     });
  //   }
  // }, [navigation])
  const navigateToProjectUpdates = () => navigation.navigate('ProjectNotification',  { project });

  useEffect(() => {
    if (project) {
      navigation.setOptions({
        header: () => (
          <ProjectHeader
            projectName={project.ProjectName}
            projectOwner={project?.Owner}
            imageSource={{ uri: project?.ImageURL }}  // Dummy image URL
            navigateToProjectDetails={() => {
              navigation.navigate('ProjectDetails', { project });
            }}
            navigateToProjectUpdates={navigateToProjectUpdates}
          />
        ),
      });


    }
  }, [navigation, project]);

  return (
    <View style={styles.container}>
      <ProjectChatManagement project={project}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default ProjectChatScreen;
