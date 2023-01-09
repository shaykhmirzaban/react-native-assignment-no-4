import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  Image,
} from 'react-native';

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
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          blurRadius={20}
          source={require('../images/background.jpg')}
          style={{
            width: '100%',
            height: 200,
            marginTop: -10,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <View style={{padding: 10}}>
            <Image
              source={require('../images/user.jpg')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderColor: '#ccc',
                borderWidth: 1,
              }}
            />
            <Text style={{color: '#fff', fontWeight: 'bold', paddingTop: 5}}>
              S.K Mirzaban
            </Text>
            <Text style={{color: '#fff'}}>Front-end developer</Text>
          </View>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{padding: 10}}>
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
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
