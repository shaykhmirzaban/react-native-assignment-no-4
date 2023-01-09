import {NavigationContainer} from '@react-navigation/native';

// component
import StackNavigation from './navigation/StackNavigation';

function MyApp() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default MyApp;
