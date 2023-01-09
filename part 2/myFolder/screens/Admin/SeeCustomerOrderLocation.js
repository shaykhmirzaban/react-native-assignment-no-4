import {useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

// firebase
import database from '@react-native-firebase/database';

function SeeCustomerOrderLocation({navigation, route}) {
  let [data, setData] = useState(route.params);

  const deleteFn = () => {
    database()
      .ref(`CustomerOrder/${data.key}`)
      .remove()
      .then(() => {
        ToastAndroid.show('Successfully deleted', ToastAndroid.SHORT);
        navigation.navigate('AdminCustomerOrder');
      })
      .catch(error => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 10,
      }}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={[styles.map]}
          region={{
            latitude: data.latitude ? Number(data.latitude) : 37.78825,
            longitude: data.longitude ? Number(data.longitude) : -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#eee',
          padding: 15,
          marginVertical: 10,
          borderRadius: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#000',
              paddingBottom: 10,
            }}>
            Information
          </Text>
        </View>
        <View style={styles.divStyle}>
          <Text style={styles.divTextStyle}>Name: </Text>
          <Text style={styles.textStyle}>{data && data.name}</Text>
        </View>
        <View style={styles.divStyle}>
          <Text style={styles.divTextStyle}>Date: </Text>
          <Text style={styles.textStyle}>{data && data.date}</Text>
        </View>
        <View style={styles.divStyle}>
          <Text style={styles.divTextStyle}>Number: </Text>
          <Text style={styles.textStyle}>{data && data.number}</Text>
        </View>
        <View style={styles.divStyle}>
          <Text style={styles.divTextStyle}>Address: </Text>
          <Text style={styles.textStyle}>{data && data.address}</Text>
        </View>
        <View style={styles.divStyle}>
          <Text style={styles.divTextStyle}>Total Price: </Text>
          <Text style={styles.textStyle}>{data && data.totalPrice}</Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Order Completed:
          </Text>
          <TouchableOpacity
            onPress={deleteFn}
            style={{
              width: 130,
              height: 50,
              backgroundColor: 'red',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 22,
                color: '#fff',
                fontWeight: 'bold',
                paddingRight: 5,
              }}>
              Delete
            </Text>
            <Icon name="delete" color={'#fff'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
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
  divStyle: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  divTextStyle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  textStyle: {
    color: '#000',
    fontSize: 16,
  },
});

export default SeeCustomerOrderLocation;
