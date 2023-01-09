import {Image, StatusBar, Text, View, TouchableOpacity} from 'react-native';

function WelcomeScreen({navigation}) {
  const navigate = name => {
    navigation.navigate(name);
  };
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {/* image */}
      <Image
        resizeMode="contain"
        style={{width: '100%', height: '60%'}}
        source={require('../images/welcome.jpg')}
      />
      <View
        style={{
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          height: '40%',
          paddingHorizontal: 20,
          paddingBottom: 15,
        }}>
        {/* text */}
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#1D1200',
              textAlign: 'center',
              paddingVertical: 5,
            }}>
            WELCOME!
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: '#2F2F2F',
              paddingVertical: 5,
              textAlign: 'center',
              lineHeight: 25,
            }}>
            Thanks for joining us. We’re looking forward to serving you great
            pizza. Scroll to find out what else you’ll get with our mobile app.{' '}
          </Text>
        </View>
        {/* button */}
        <TouchableOpacity
          onPress={() => navigate('LoginScreen')}
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#F7C16B',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WelcomeScreen;
