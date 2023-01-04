import {createNativeStackNavigator} from '@react-navigation/native-stack';

// component
import DrawerNavigation1 from '../../navigation/DrawerNavigation1';
import LastDetailScreen from './LastDetailScreen';
import ProductDetail from './ProductDetail';
import SuccessfullyMessageScreen from './SuccessfullMessageScreen';

const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigation1"
        component={DrawerNavigation1}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Information" component={LastDetailScreen} />
      <Stack.Screen
        name="SuccessfullyMessageScreen"
        component={SuccessfullyMessageScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;
