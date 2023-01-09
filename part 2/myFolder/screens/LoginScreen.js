import {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

// firebase
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}) {
  let [data, setData] = useState();
  let [flag, setFlag] = useState(false);

  const navigate = name => {
    navigation.navigate(name);
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        if (user.email === 'admin@admin.com') {
          navigate('AdminScreen');
        } else {
          navigate('HomeScreen');
        }
      }
    });
  }, []);

  const loginFn = () => {
    setFlag(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        // ...
        const keyFn = async () => {
          try {
            let id = await AsyncStorage.setItem('key', user.uid);
          } catch (error) {
            console.log(error);
          }
        };
        keyFn();

        ToastAndroid.show('Successfully Login', ToastAndroid.SHORT);
        if (data.email === 'admin@admin.com' && data.password === 'admin1234') {
          navigate('AdminScreen');
        } else {
          navigate('HomeScreen');
        }

        setFlag(false);
      })
      .catch(error => {
        var errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setFlag(false);
      });
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <Image
        resizeMode="cover"
        style={{width: '100%', height: '40%'}}
        source={require('../images/login1.png')}
      />
      <View
        style={{padding: 20, justifyContent: 'space-between', height: '60%'}}>
        {/* login form */}
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
              Login
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
              placeholder="Email"
              onChangeText={e => setData({...data, email: e.toLowerCase()})}
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
              If you have not an account?{' '}
            </Text>
            <Text
              onPress={() => navigate('SignUpScreen')}
              style={{fontSize: 16, color: '#1D1200', fontWeight: 'bold'}}>
              Sign Up
            </Text>
          </View>
        </View>
        {/* button */}
        <TouchableOpacity
          onPress={loginFn}
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#F7C16B',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {flag ? (
            <ActivityIndicator color={'#fff'} size={'small'} />
          ) : (
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              Login
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
