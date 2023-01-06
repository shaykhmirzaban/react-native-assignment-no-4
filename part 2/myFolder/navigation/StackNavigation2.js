import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import AdminUserPage from '../screens/Admin/AdminUserPage';
import SeeCustomerOrderLocation from '../screens/Admin/SeeCustomerOrderLocation';

const Stack = createNativeStackNavigator();
function StackNavigation2() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminCustomerOrder"
        component={AdminUserPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeCustomerOrderLocation"
        component={SeeCustomerOrderLocation}
        options={{headerTitle: 'Order Detail'}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation2;
