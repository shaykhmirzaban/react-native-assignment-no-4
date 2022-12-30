import {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

// firebase
import auth from '@react-native-firebase/auth';

function LoginScreen({navigation}) {
  let [data, setData] = useState();
  let [flag, setFlag] = useState(false);

  // navigate
  const navigate = name => {
    navigation.navigate(name);
  };

  const LoginFn = () => {
    setFlag(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed in
        // var user = userCredential.user;
        // ...
        ToastAndroid.show('Successfully Login', ToastAndroid.SHORT);
        navigate('HomeScreen');
        setFlag(false);
      })
      .catch(error => {
        var errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setFlag(false);
      });
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        {/* heading */}
        <View>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              color: '#000',
              paddingVertical: 5,
            }}>
            Login
          </Text>
        </View>
        {/* form */}
        <View style={{width: '90%'}}>
          <TextInput
            placeholder="Email"
            onChangeText={e => setData({...data, email: e})}
            style={{
              width: '100%',
              height: 55,
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 15,
              fontSize: 16,
            }}
          />
          <TextInput
            placeholder="Password"
            onChangeText={e => setData({...data, password: e})}
            style={{
              width: '100%',
              height: 55,
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 15,
              fontSize: 16,
            }}
            secureTextEntry={true}
          />
        </View>
        {/* extra part */}
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: '#333'}}>
            Do you have not an account?{' '}
          </Text>
          <Text
            onPress={() => navigate('SignUpScreen')}
            style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
            Sign Up
          </Text>
        </View>
      </View>
      {/* button */}
      <TouchableOpacity
        onPress={LoginFn}
        style={{
          width: '90%',
          height: 60,
          backgroundColor: '#333',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {flag ? (
          <ActivityIndicator color={'#fff'} size={'small'} />
        ) : (
          <Text style={{color: '#eee', fontWeight: 'bold', fontSize: 20}}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
