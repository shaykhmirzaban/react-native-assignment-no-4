import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import Home from '../screens/Home';
import History from '../screens/History';
import Home1 from '../screens/Home1';

const Tab = createBottomTabNavigator();
function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#fff',
        // tabBarInactiveTintColor: '#333',
        // tabBarInactiveBackgroundColor: '#fff',
      }}>
      <Tab.Screen
        name="Home1"
        component={Home1}
        options={{
          tabBarIcon: () => {
            return <Icon name="home" size={25} color="#000" />;
          },
        }}
      />
      {/* <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: color => {
            return <Icon name="list-alt" size={25} color={color} />;
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default TabNavigation;
