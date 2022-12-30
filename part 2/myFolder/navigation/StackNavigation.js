import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import Home from '../screens/Home';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();
function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
