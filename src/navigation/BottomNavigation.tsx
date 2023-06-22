import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type BottomTabNavigatorParams = {
  Profile: undefined;
  Contact: undefined;
  Dashboard: undefined;
};

const BottomTabNavigator = createBottomTabNavigator<BottomTabNavigatorParams>();

const BottomNavigation = () => {
  return (
    <BottomTabNavigator.Navigator>
      <></>
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigation;
