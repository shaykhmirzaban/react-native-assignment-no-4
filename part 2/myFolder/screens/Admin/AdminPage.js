import {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// firebase
import database from '@react-native-firebase/database';

function AdminPage() {
  let [image, setImage] = useState('');
  let [data, setData] = useState({
    name: '',
    description: '',
    price: '',
  });
  let [flag, setFlag] = useState(false);

  const selectImage = async () => {
    launchImageLibrary({includeBase64: true}, e => {
      setImage(e.assets[0].base64);
    });
    // You can also use as a promise without 'callback':
    const result = await launchImageLibrary({includeBase64: true});
    setImage(result.assets[0].base64);
  };

  const resetAll = () => {
    setData([]);
  };

  const uploadData = () => {
    setFlag(true);
    if (data.name !== '' && data.description !== '' && data.price !== '') {
      let id = database().ref('Product').push();
      database()
        .ref(`Product/${id.key}`)
        .set({...data, key: id.key})
        .then(() => {
          ToastAndroid.show('Successfully Add', ToastAndroid.SHORT);
          resetAll();
        })
        .catch(error => {
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
      setFlag(false);
    } else {
      ToastAndroid.show(
        'First fill all field then click add',
        ToastAndroid.SHORT,
      );
      setFlag(false);
    }
  };

  return (
    <View>
      {/* add pizza */}
      <View
        style={{
          width: '100%',
          backgroundColor: '#F7C16B',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>
          Add Pizza
        </Text>
      </View>
      {/* form */}
      <View style={{padding: 10}}>
        <TextInput
          placeholder="Name"
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
          value={data.name}
        />
        <TextInput
          placeholder="Short description"
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
          value={data.description}
        />
        <TextInput
          placeholder="Price"
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
          onChangeText={e => setData({...data, price: e})}
          keyboardType={'number-pad'}
          value={data.price}
        />

        <TouchableOpacity
          onPress={selectImage}
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#F7C16B',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            Select Image
          </Text>
        </TouchableOpacity>

        <Image
          style={{
            width: 200,
            height: 200,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}
          source={{uri: 'data:image/jpeg;base64,' + image}}
        />

        {/* ulpoad data */}
        <TouchableOpacity
          onPress={uploadData}
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#F7C16B',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          {flag ? (
            <ActivityIndicator color={'#fff'} size={22} animating={flag} />
          ) : (
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              Add
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AdminPage;
