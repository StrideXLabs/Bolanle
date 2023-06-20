import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PersonalInformation from '../screens/BusinessCard/PersonalInformation';

export type BottomTabNavigatorParams = {
  Profile: undefined;
  Contact: undefined;
  Dashboard: undefined;
};

const BottomTabNavigator = createBottomTabNavigator<BottomTabNavigatorParams>();

const BottomNavigation = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="Dashboard"
        component={PersonalInformation}
      />
      <BottomTabNavigator.Screen
        name="Contact"
        component={PersonalInformation}
      />
      <BottomTabNavigator.Screen
        name="Profile"
        component={PersonalInformation}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigation;
