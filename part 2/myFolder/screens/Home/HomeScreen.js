import {createNativeStackNavigator} from '@react-navigation/native-stack';

// component
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';

const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
