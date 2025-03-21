import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import JobFinder from '../screens/JobFinderScreen';
import SavedJobs from '../screens/SavedJobsScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="JobFinder"
          component={JobFinder}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="SavedJobs" component={SavedJobs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
