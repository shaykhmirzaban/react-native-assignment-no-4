import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
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
  let [boolean, setBoolean] = useState(false);
  let [loading, setLoading] = useState('');

  // fetch data
  useEffect(() => {
    setLoading('Loading');
    database()
      .ref('Product')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          setData(Object.values(snapshort.val()));
          setFlag('');
          setLoading('');
        } else {
          setFlag('Empty');
          setLoading('');
          setData([]);
        }
      });

    // const fetchData = dataIsExist => {
    //   setLoading('Loading');
    //   return new Promise((res, rej) => {
    //     if (dataIsExist) {
    //       res('succefully fetch data');
    //       setLoading('');
    //       setFlag('');
    //     } else {
    //       rej('error');
    //       setLoading('');
    //       setFlag('Empty');
    //     }
    //   });
    // };

    // fetchData()
    //   .then(e => console.log(e))
    //   .catch(e => {
    //     console.log(e);
    //   });
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

  const refreshingFn = () => {
    setBoolean(true);
    setTimeout(() => setBoolean(false), 1000);
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
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>
          All Data
        </Text>

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" color="#000" size={27} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{marginVertical: 10}}>
          <ActivityIndicator
            size={'large'}
            color={'#000'}
            animating={loading === '' ? false : true}
          />
        </View>
      ) : data && data.length > 0 ? (
        <ScrollView
          style={{marginBottom: 15, padding: 10}}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          refreshControl={
            <RefreshControl refreshing={boolean} onRefresh={refreshingFn} />
          }>
          {data.map((value, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigate('UpdateDataScreen', value)}
                style={{
                  width: 155,
                  padding: 10,
                  backgroundColor: '#FCF1DF',
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                {/* right side */}
                <View>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 135,
                      height: 135,
                      borderRadius: 10,
                    }}
                    source={{uri: value.image}}
                  />
                </View>

                {/* left side */}
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#1D1200',
                      fontWeight: 'bold',
                      paddingVertical: 10,
                    }}>
                    {value.name}
                  </Text>
                  <Text style={{fontSize: 16, color: '#000'}}>
                    {value.description && value.description.length > 30
                      ? `${value.description.slice(0, 30)}...`
                      : value.description}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#333',
                      paddingVertical: 5,
                    }}>
                    Rs {value.price}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => deleteFn(value.key)}
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      paddingRight: 5,
                    }}>
                    Delete
                  </Text>
                  <Icon name="delete" color={'#fff'} size={22} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={{padding: 10}}>
          <Text>{flag}</Text>
        </View>
      )}
    </View>
  );
}

export default AdminHomePage;
