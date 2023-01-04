import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawer from './CustomDrawer.js';
import HomePage from '../screens/Home/HomePage.js';

const Drawer = createDrawerNavigator();
function DrawerNavigation1({navigation, route}) {
  const singoutUserFn = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <CustomDrawer singOutUserFn={singoutUserFn} {...props} />;
      }}>
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          drawerActiveBackgroundColor: '#fad7a0',
          drawerActiveTintColor: '#1D1200',
          drawerLabel: 'Home',
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation1;
