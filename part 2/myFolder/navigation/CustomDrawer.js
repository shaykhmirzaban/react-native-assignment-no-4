import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text, View, TouchableOpacity, ToastAndroid} from 'react-native';

// firebase
import auth from '@react-native-firebase/auth';

function CustomDrawer(props) {
  const logoutUser = () => {
    auth()
      .signOut()
      .then(() => {
        ToastAndroid.show('Successfully Logout', ToastAndroid.SHORT);
        props.singOutUserFn();
      })
      .catch(error => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={logoutUser}
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#F7C16B',
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#fff'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomDrawer;
