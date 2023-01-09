import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawer from './CustomDrawer.js';
// import AdminHomePage from '../screens/Admin/AdminHomePage';
import StackNavigation1 from './StackNavigation1.js';

const Drawer = createDrawerNavigator();
function DrawerNavigation({navigation, route}) {
  const singoutUserFn = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <CustomDrawer singOutUserFn={singoutUserFn} {...props} />;
      }}>
      <Drawer.Screen
        name="StackNavigation1"
        component={StackNavigation1}
        options={{
          headerShown: false,
          drawerActiveBackgroundColor: '#fad7a0',
          drawerActiveTintColor: '#1D1200',
          drawerLabel: 'Home',
          drawerLabelStyle: {paddingHorizontal: 20},
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
