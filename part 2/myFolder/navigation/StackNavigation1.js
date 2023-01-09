import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import AdminHomePage from '../screens/Admin/AdminHomePage';
import UpdateDataScreen from '../screens/Admin/UpdateDataScreen';

const Stack = createNativeStackNavigator();
function StackNavigation1() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="AdminHomePage"
        component={AdminHomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateDataScreen"
        component={UpdateDataScreen}
        options={{headerTitle: 'Update Data Screen'}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation1;
