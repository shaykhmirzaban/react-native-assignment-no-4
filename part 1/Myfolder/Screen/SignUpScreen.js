import {useState} from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

// firebase
import auth from '@react-native-firebase/auth';

function SignUpScreen({navigation}) {
  let [data, setData] = useState();

  // navigate
  const navigate = name => {
    navigation.navigate(name);
  };

  const SignUpFn = () => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed in
        // var user = userCredential.user;
        // ...
        ToastAndroid.show('Successfully Sign Up', ToastAndroid.SHORT);
        navigate('HomeScreen');
      })
      .catch(error => {
        var errorMessage = error.message;
        // ..
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
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
            Sign Up
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
            Do you have an account?{' '}
          </Text>
          <Text
            onPress={() => navigate('LoginScreen')}
            style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
            Login
          </Text>
        </View>
      </View>
      {/* button */}
      <TouchableOpacity
        onPress={SignUpFn}
        style={{
          width: '90%',
          height: 60,
          backgroundColor: '#333',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#eee', fontWeight: 'bold', fontSize: 20}}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen;
