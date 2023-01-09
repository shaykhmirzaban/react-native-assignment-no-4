import {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// FIREBASE
import database from '@react-native-firebase/database';

function LastDetailScreen({navigation, route}) {
  let [longitude, setLongitude] = useState('');
  let [latitude, setLatitude] = useState('');
  let [flag, setFlag] = useState(false);
  let [data, setData] = useState(route.params);
  let [item, setItem] = useState({
    name: '',
    address: '',
    number: '',
  });

  const navigate = name => {
    navigation.navigate(name);
  };

  // Geolocation.getCurrentPosition(
  //   //Will give you the current location
  //   position => {
  //     //getting the Longitude from the location json
  //     const currentLongitude = JSON.stringify(position.coords.longitude);

  //     //getting the Latitude from the location json
  //     const currentLatitude = JSON.stringify(position.coords.latitude);
  //     setLongitude(currentLongitude);
  //     setLatitude(currentLatitude);
  //   },
  //   {
  //     enableHighAccuracy: true,
  //     timeout: 20000,
  //     maximumAge: 1000,
  //   },
  // );

  const checkOutFn = () => {
    if (item.name !== '' && item.number !== '' && item.address !== '') {
      item.longitude = longitude;
      item.latitude = latitude;
      item.totalPrice = Number(route.params.price) + 100;
      let data = new Date();
      item.date = String(data);

      item.key = database().ref('CustomerOrder/').push().key;

      database()
        .ref(`CustomerOrder/${item.key}`)
        .set(item)
        .then(() => {
          ToastAndroid.show('Successfully Checkout', ToastAndroid.SHORT);
          navigate('SuccessfullyMessageScreen');
        })
        .catch(error => {
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show('Please fill all field', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      contentContainerStyle={{width: '100%', padding: 20}}>
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
        keyboardType="default"
        onChangeText={e => setItem({...item, name: e})}
      />
      <TextInput
        placeholder="Number"
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
        keyboardType="phone-pad"
        onChangeText={e => setItem({...item, number: e})}
      />
      <TextInput
        placeholder="Enter Address"
        style={{
          backgroundColor: '#fad7a0',
          color: '#1D1200',
          paddingHorizontal: 15,
          borderRadius: 5,
          fontSize: 17,
          marginBottom: 10,
        }}
        placeholderTextColor="#1D1200"
        multiline={true}
        numberOfLines={4}
        onChangeText={e => setItem({...item, address: e})}
      />

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map]}
          region={{
            latitude: latitude ? Number(latitude) : 37.78825,
            longitude: longitude ? Number(longitude) : -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {/* <Marker
            coordinate={{
              latitude: latitude && latitude,
              longitude: longitude && longitude,
            }}
            pinColor="red"
            title="You current Location">
            <View style={{backgroundColor: 'red', padding: 10}}>
              <Text>SF</Text>
            </View>
          </Marker> */}
        </MapView>
      </View>

      {/* information */}
      <View
        style={{
          width: '100%',
          padding: 20,
          backgroundColor: '#eee',
          marginVertical: 10,
          borderRadius: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            Product name:{' '}
            <Text style={{color: '#000', fontWeight: 'normal'}}>
              {data && data.name}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            Product Price:{' '}
            <Text style={{color: '#000', fontWeight: 'normal'}}>
              RS {data && data.price}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            Shipping charges:
            <Text style={{color: '#000', fontWeight: 'normal'}}> RS 100</Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            Total:
            <Text style={{color: '#000', fontWeight: 'normal'}}>
              {' '}
              RS {data && Number(data.price) + 100}
            </Text>
          </Text>
        </View>
      </View>

      {/* button */}
      <TouchableOpacity
        onPress={checkOutFn}
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
            Checkout
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: '#F7C16B',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LastDetailScreen;
