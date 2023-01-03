import {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

// firebase
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

function AdminHomePage({navigation}) {
  let [data, setData] = useState([]);
  let [flag, setFlag] = useState('');

  // fetch data
  useEffect(() => {
    database()
      .ref('Product')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          setData(Object.values(snapshort.val()));
          setFlag('');
        } else {
          setFlag('There is no data');
        }
      });
  }, []);

  const navigate = (name, e) => {
    navigation.navigate(name, e);
  };

  const deleteFn = id => {
    database()
      .ref(`Product/${id}`)
      .remove()
      .then(() => {
        ToastAndroid.show('successfully delete', ToastAndroid.SHORT);
      })
      .catch(error => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <StatusBar backgroundColor={'#F7C16B'} barStyle={'dark-content'} />
      <View
        style={{
          width: '100%',
          backgroundColor: '#F7C16B',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>
          All Data
        </Text>
      </View>
      {data && data.length > 0 ? (
        <ScrollView style={{marginBottom: 15, padding: 10}}>
          {data.map((value, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigate('UpdateDataScreen', value)}
                style={{
                  padding: 15,
                  backgroundColor: '#FCF1DF',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                {/* left side */}
                <View style={{justifyContent: 'space-between'}}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#1D1200',
                        fontWeight: 'bold',
                      }}>
                      {value.name}
                    </Text>
                    <Text style={{fontSize: 14, color: '#000'}}>
                      {value.description}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#1D1200',
                      }}>
                      Rs {value.price}
                    </Text>
                  </View>
                </View>
                {/* right side */}
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => deleteFn(value.key)}
                    style={{
                      paddingTop: 10,
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="delete" size={25} color="red" />
                  </TouchableOpacity>
                  <Image
                    style={{width: 85, height: 85, borderRadius: 10}}
                    source={require('../../images/pizza.webp')}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View>
          <Text>{flag}</Text>
        </View>
      )}
    </View>
  );
}

export default AdminHomePage;
