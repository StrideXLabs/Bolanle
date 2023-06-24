import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Dashboard';

export type BottomTabNavigatorParams = {
  Profile: undefined;
  Contact: undefined;
  DashboardScreen: undefined;
};

const BottomTabNavigator = createBottomTabNavigator<BottomTabNavigatorParams>();

const BottomNavigation = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="DashboardScreen"
        component={DashboardScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigation;
