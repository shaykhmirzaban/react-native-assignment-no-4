import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// firebase
import database from '@react-native-firebase/database';

function HomePage({navigation}) {
  let [data, setData] = useState([]);
  let [item, setItem] = useState([]);
  let [flag, setFlag] = useState(false);
  let [boolean, setBoolean] = useState(false);

  const navigate = (name, e) => {
    navigation.navigate(name, e);
  };

  const fetchDataFirebase = () => {
    database()
      .ref('Product')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          setData(Object.values(snapshort.val()));
          setFlag(false);
        } else {
          setFlag(false);
        }
      });
  };

  useEffect(() => {
    setFlag(true);
    fetchDataFirebase();
    // const fetchData = dataIsExist => {
    //   return new Promise((res, rej) => {
    //     if (dataIsExist.length > 0) {
    //       res('fetch');
    //     } else {
    //       rej('error');
    //       setFlag(false);
    //     }
    //   });
    // };
    // fetchData(data)
    //   .then(e => console.log(e))
    //   .catch(e => console.log(e));
  }, []);

  const searchFn = e => {
    if (e) {
      let filterdata = data.filter(item => {
        let particularData = item.name && item.name.toUpperCase();
        let userValue = e.toUpperCase();
        return particularData.indexOf(userValue) > -1;
      });
      setItem(filterdata);
    } else {
      setItem([]);
    }
  };

  const refresingFn = () => {
    setBoolean(true);
    setTimeout(() => {
      fetchDataFirebase();
      setBoolean(false);
    }, 1000);
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'#f7c16b'} barStyle={'dark-content'} />
      <ImageBackground
        blurRadius={100}
        style={{
          width: '100%',
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../images/image.png')}>
        <View
          style={{
            width: '90%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            top: 5,
          }}>
          <View>
            <Text style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
              Pizza Lylo
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" color="#000" size={27} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '90%',
            height: 65,
            backgroundColor: '#fde8c6',
            borderRadius: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search Here"
            style={{
              width: '85%',
              fontSize: 16,
              color: '#1D1200',
            }}
            placeholderTextColor={'#1D1200'}
            onChangeText={e => searchFn(e)}
          />
          <Icon name="search" color={'#1D1200'} size={27} />
        </View>
      </ImageBackground>

      <View style={{padding: 20, width: '100%', flex: 1}}>
        {/* heading */}
        <View style={{paddingBottom: 10}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#1D1200'}}>
            All Pizza
          </Text>
        </View>

        {flag ? (
          <ActivityIndicator
            color={'#1D1200'}
            size={'large'}
            animating={flag}
          />
        ) : item && item.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
            refreshControl={
              <RefreshControl refreshing={boolean} onRefresh={refresingFn} />
            }>
            {item &&
              item.length > 0 &&
              item.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigate('ProductDetail', value)}
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
                        {value.description.length > 30
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
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
            refreshControl={
              <RefreshControl refreshing={boolean} onRefresh={refresingFn} />
            }>
            {data && data.length > 0 ? (
              data.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigate('ProductDetail', value)}
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
                        {value.description.length > 30
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
                  </TouchableOpacity>
                );
              })
            ) : (
              <View>
                <Text>Empty</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

export default HomePage;
