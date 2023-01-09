import {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// firebase
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

function AdminPage() {
  let [image, setImage] = useState('');
  let [data, setData] = useState({
    name: '',
    description: '',
    price: '',
  });
  let [flag, setFlag] = useState(false);
  let [upload, setUploading] = useState(null);
  let [tranferred, setTransferred] = useState(null);

  const selectImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  // const selectImage = async () => {
  //   launchImageLibrary({includeBase64: true}, e => {
  //     setImage(e.assets[0].base64);
  //   });
  //   // You can also use as a promise without 'callback':
  //   const result = await launchImageLibrary({includeBase64: true});
  //   setImage(result.assets[0].base64);
  // };

  const resetAll = () => {
    setData([]);
  };

  const uploadData = () => {
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
  };

  const deleteImageFn = () => {
    setImage('');
    ToastAndroid.show('successfully delete', ToastAndroid.SHORT);
  };

  const uploadImage = async () => {
    if (
      data.name !== '' &&
      data.description !== '' &&
      data.price !== '' &&
      image !== ''
    ) {
      setFlag(true);
      const uri = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      setUploading(true);
      setTransferred(0);

      const task = storage().ref(filename).putFile(uploadUri);

      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        );
      });

      try {
        await task;
        const url = await storage().ref(filename).getDownloadURL();
        data.image = url;
        uploadData();
        console.log(url);
      } catch (e) {
        console.error(e);
      }

      setUploading(false);

      setImage(null);
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
    <ScrollView style={{backgroundColor: '#fff'}}>
      {/* add pizza */}
      <View
        style={{
          width: '100%',
          backgroundColor: '#F7C16B',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>
          Add Pizza
        </Text>
      </View>
      {/* form */}
      <View style={{padding: 10, justifyContent: 'space-between'}}>
        <View>
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
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                paddingRight: 5,
              }}>
              Select Image
            </Text>
            <Icon name="image" size={27} color={'#fff'} />
          </TouchableOpacity>

          {image && (
            <View style={{position: 'relative'}}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                  borderRadius: 10,
                }}
                source={{uri: image}}
              />
              <TouchableOpacity
                onPress={deleteImageFn}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: -5,
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}>
                <Icon name="delete" size={27} color={'red'} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* ulpoad data */}
        <TouchableOpacity
          onPress={uploadImage}
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
    </ScrollView>
  );
}

export default AdminPage;
