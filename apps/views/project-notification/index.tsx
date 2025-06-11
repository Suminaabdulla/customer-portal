import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationTab from './components/tab';

const ProjectNotificationManagement = ({ project }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectUpdates, setProjectUpdates] = useState(null);

  const fetchProjectUpdates = async (userId: string, projectNo: string) => {

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://crmss.naffco.com/CRMSS/CRMAdmin/SteeringCommittee.aspx/GetOthersOptUpdates',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId, ProjectNo: projectNo }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setProjectUpdates(result.d[0]); // Assuming the project details are in result.d
      } else {
        setError('Failed to fetch project details.');
      }
    } catch (error) {
      setError('An error occurred while fetching project details.');
    } finally {
      setLoading(false);
    }
  };
  const loadProjectDetails = async () => {
    try {
      const user = await AsyncStorage.getItem('userDetails'); // Fetch userDetails from AsyncStorage
      const userDetails = user ? JSON.parse(user) : null; // Parse the string to object

      if (userDetails?.UserID && project.ProjectNo) {
        fetchProjectUpdates(userDetails.UserID, project.ProjectNo);
      } else {
        setError('User ID or Project No is missing');
      }
    } catch (error) {
      setError('Failed to retrieve user data from AsyncStorage');
    }
  };

  useEffect(() => {
    loadProjectDetails();

  }, [project]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}  refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadProjectDetails} />
      }>
      <NotificationTab projectUpdates={projectUpdates} />
    </ScrollView>
  );
};

export default ProjectNotificationManagement;
