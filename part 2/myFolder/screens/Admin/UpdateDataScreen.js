import {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

// firebase
import database from '@react-native-firebase/database';

function UpdateDataScreen({navigation, route}) {
  let [data, setData] = useState([]);

  useEffect(() => {
    setData(route.params);
  }, []);

  const updateData = () => {
    database()
      .ref(`Product/${data.key}`)
      .update(data)
      .then(() => {
        ToastAndroid.show('Successfully Update', ToastAndroid.SHORT);
      })
      .catch(error => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <View>
        <TextInput
          placeholder="name"
          value={data.name}
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
          onChangeText={e => setData({...data, name: e})}
        />
        <TextInput
          placeholder="description"
          value={data.description}
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
          onChangeText={e => setData({...data, description: e})}
        />
        <TextInput
          placeholder="price"
          value={data.price}
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
          keyboardType="number-pad"
          onChangeText={e => setData({...data, price: e})}
        />
      </View>

      {/* ulpoad data */}
      <TouchableOpacity
        onPress={updateData}
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#F7C16B',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default UpdateDataScreen;
