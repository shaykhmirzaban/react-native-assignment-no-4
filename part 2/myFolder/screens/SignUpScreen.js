import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

// firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUpScreen({navigation}) {
  let [data, setData] = useState();
  let [flag, setFlag] = useState(false);

  const navigate = name => {
    navigation.navigate(name);
  };

  const signUpFn = () => {
    setFlag(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;

        const setKey = async () => {
          try {
            let id = await AsyncStorage.setItem('key', user.uid);
          } catch (error) {
            console.log(error);
          }
        };
        setKey();

        // ...
        database()
          .ref(`users/${user.uid}`)
          .set({...data, key: user.uid})
          .then(() => {
            ToastAndroid.show(
              'Successfully create an account',
              ToastAndroid.SHORT,
            );

            if (
              data.email === 'admin@admin.com' &&
              data.password === 'admin1234'
            ) {
              navigate('AdminScreen');
            } else {
              navigate('HomeScreen');
            }
          })
          .catch(() => {
            ToastAndroid.show('Something is wrong', ToastAndroid.SHORT);
          });
        setFlag(false);
      })
      .catch(error => {
        var errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setFlag(false);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        // // flex: 1,
        // height: '100%',
        backgroundColor: '#fff',
      }}>
      <View>
        <Image
          resizeMode="contain"
          style={{width: '100%', height: 250}}
          source={require('../images/signup.png')}
        />
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            justifyContent: 'space-between',
          }}>
          {/* SignUP form */}
          <View>
            {/* heading */}
            <View style={{paddingBottom: 15}}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#1D1200',
                  textAlign: 'center',
                }}>
                Sign Up
              </Text>
            </View>
            {/* form */}
            <View>
              <TextInput
                style={{
                  backgroundColor: '#fad7a0',
                  color: '#1D1200',
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  fontSize: 17,
                  height: 60,
                  marginBottom: 10,
                }}
                placeholderTextColor="#1D1200"
                placeholder="Name"
                onChangeText={e => setData({...data, name: e})}
              />
              <TextInput
                style={{
                  backgroundColor: '#fad7a0',
                  color: '#1D1200',
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  fontSize: 17,
                  height: 60,
                  marginBottom: 10,
                }}
                placeholderTextColor="#1D1200"
                placeholder="Email"
                onChangeText={e => setData({...data, email: e})}
                keyboardType="email-address"
              />
              <TextInput
                style={{
                  backgroundColor: '#fad7a0',
                  color: '#1D1200',
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  fontSize: 17,
                  height: 60,
                }}
                placeholderTextColor="#1D1200"
                placeholder="Password"
                onChangeText={e => setData({...data, password: e})}
                secureTextEntry={true}
              />
            </View>
            {/* extrat part */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 16, color: '#000000'}}>
                If you have an account?{' '}
              </Text>
              <Text
                onPress={() => navigate('LoginScreen')}
                style={{fontSize: 16, color: '#1D1200', fontWeight: 'bold'}}>
                Login
              </Text>
            </View>
          </View>

          {/* button */}
          <TouchableOpacity
            onPress={signUpFn}
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#F7C16B',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {flag ? (
              <ActivityIndicator color={'#fff'} size="small" animating={flag} />
            ) : (
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;
