import {createNativeStackNavigator} from '@react-navigation/native-stack';

// component
import DrawerNavigation1 from './DrawerNavigation1';
import LastDetailScreen from '../screens/Home/LastDetailScreen';
import ProductDetail from '../screens/Home/ProductDetail';
import SuccessfullyMessageScreen from '../screens/Home/SuccessfullMessageScreen';

const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="DrawerNavigation1"
        component={DrawerNavigation1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerTitle: 'Product Detail'}}
      />
      <Stack.Screen name="Information" component={LastDetailScreen} />
      <Stack.Screen
        name="SuccessfullyMessageScreen"
        component={SuccessfullyMessageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;
