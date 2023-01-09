import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SuccessfullyMessageScreen({navigation}) {
  const navigate = name => {
    navigation.navigate(name);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#e5c07c',
        justifyContent: 'space-between',
      }}>
      <Image
        style={{width: '100%', height: '45%'}}
        source={require('../../images/boy.png')}
      />
      <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 15,
        }}>
        <Text
          style={{
            fontSize: 28,
            color: 'green',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          🎉🎉congratulation🎉🎉
        </Text>
        <View
          style={{
            backgroundColor: '#eee',
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Text
            style={{
              color: '#333',
              fontSize: 20,
              padding: 10,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="directions-bike" size={25} color={'#1D1200'} /> Dilevery
            within 20 minutes
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#f7c16b',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}
          onPress={() => navigate('HomePage')}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Back to home
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SuccessfullyMessageScreen;
