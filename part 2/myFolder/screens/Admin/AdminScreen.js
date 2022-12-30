import {createNativeStackNavigator} from '@react-navigation/native-stack';

// componet
import AdminPage from '../Admin/AdminPage.js';

const Stack = createNativeStackNavigator();
function AdminScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminPage" component={AdminPage} />
    </Stack.Navigator>
  );
}

export default AdminScreen;
