import {Text, TouchableOpacity, View} from 'react-native';

function SuccessfullyMessageScreen({navigation}) {
  const navigate = name => {
    navigation.navigate(name);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 25,
            color: 'green',
            fontWeight: '400',
            textAlign: 'center',
          }}>
          🎉🎉Successfully Completed all Process🎉🎉
        </Text>
        <Text
          style={{
            color: '#333',
            fontSize: 20,
            paddingVertical: 10,
            textAlign: 'center',
          }}>
          You can recive your order in 5 to 10 minutes
        </Text>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 60,
            backgroundColor: '#f7c16b',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}
          onPress={() => navigate('HomePage')}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SuccessfullyMessageScreen;
