import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingsStack, ProjectStack } from './StackNavigator';
import ProjectListScreen from '../screens/projects';
import SettingsScreen from '../screens/settings';
import SettingsWithHeader from '../screens/settings';

const Tab = createBottomTabNavigator();

type MyTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const MyTabBar: React.FC<MyTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  return (
  <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'projectList') {
              navigation.navigate('projectList', { screen: 'ProjectList' });
            } else {
              navigation.navigate(route.name, route.params);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = (() => {
          switch (route.name) {
            case 'ProjectList':
              return isFocused ? 'account-group' : 'account-group-outline';
            case 'settings':
              return isFocused ? 'account-settings' : 'account-settings-outline';
            default:
              return 'help-circle-outline';
          }
        })();

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#b01c12' : colors.border}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}

    >
      <Tab.Screen
        name="ProjectList"
        component={ProjectListScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="account-group" color={color} size={size} />
          ),


        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsWithHeader}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="account-settings" color={color} size={size} />

          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default BottomTab;
