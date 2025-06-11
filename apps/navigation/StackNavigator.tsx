import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectChatScreen from '../screens/project-chat-screen';
import ProjectDetailsScreen from '../screens/project-details';
import ProjectNotificationScreen from '../screens/project-notifications';
import BottomTab from './BottomTabNavigator';

const Stack = createStackNavigator();

export const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name="ProjectList" component={BottomTab} />
    <Stack.Screen name="ProjectChat" component={ProjectChatScreen} options={{ headerShown: true }} />
    <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ headerShown: true }} />
    <Stack.Screen name="ProjectNotification" component={ProjectNotificationScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);
