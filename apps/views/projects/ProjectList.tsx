import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, RefreshControl } from 'react-native';
import ProjectCard from './components/ProjectCard';
import withAnimatedHeader from '../../layout/header/AnimatedHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProjectList: React.FC = () => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState({
    id: 1,
    name: 'All',
  });

  const tags = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Unread' },
    { id: 3, name: 'Starred' },
  ];

  // API call to fetch the project list
  const fetchProjectList = async () => {
    const userInfo = await AsyncStorage.getItem('userDetails');
    const userDetails = userInfo ? JSON.parse(userInfo) : null;
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://crmss.naffco.com/CRMSS/CRMAdmin/SteeringCommittee.aspx/GetMyProjectList',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userDetails?.UserID }),
        }
      );
      const result = await response.json();
      console.log("response>>",response);
      
      if (response.ok) {
        
        // Assuming the project list is in result.d
        setProjectList(result.d);
      } else {
        setError('Failed to fetch project list.');
      }
    } catch (error) {
      setError('An error occurred while fetching the project list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const selectTag = (tagDetails: { id: number; name: string }) => {
    setSelectedTag(tagDetails);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {projectList?.map((item, index) => {
        return (
        <View>
          <ProjectCard project={item} />
          <View style={styles.divider} />
        </View>
        );
      })} */}
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchProjectList} />
        }
      >
        {/* Render each project card manually */}
        {projectList?.map((item, index) => (
          <View key={index}>
            <ProjectCard project={item} />
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    padding: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

const ProjectListWithHeader = withAnimatedHeader(ProjectList);

export default ProjectListWithHeader;
