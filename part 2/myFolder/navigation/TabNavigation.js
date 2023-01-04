import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import AdminPage from '../screens/Admin/AdminPage';
import StackNavigation2 from './StackNavigation2';
import DrawerNavigation1 from './DrawerNavigation';

const Tab = createBottomTabNavigator();
function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#FCF1DF',
        // tabBarInactiveTintColor: '#333',
        // tabBarInactiveBackgroundColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="DrawerNavigation1"
        component={DrawerNavigation1}
        options={{
          tabBarIcon: color => {
            return <Icon name="home" size={25} color={'#1D1200'} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminPage"
        component={AdminPage}
        options={{
          tabBarIcon: color => {
            return <Icon name="add" size={27} color={'#1D1200'} />;
          },
          tabBarIconStyle: {
            height: 60,
            width: 60,
            backgroundColor: '#F7C16B',
            borderRadius: 50,
            position: 'absolute',
            bottom: 10,
          },
        }}
      />
      <Tab.Screen
        name="AdminUserPage"
        component={StackNavigation2}
        options={{
          tabBarIcon: color => {
            return <Icon name="list-alt" size={25} color={'#1D1200'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
