import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

// firebase
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomePage({navigation}) {
  let [data, setData] = useState([]);
  let [item, setItem] = useState([]);
  let [flag, setFlag] = useState(false);

  const navigate = (name, e) => {
    navigation.navigate(name, e);
  };

  useEffect(() => {
    setFlag(true);
    database()
      .ref('Product')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          setData(Object.values(snapshort.val()));
          setFlag(false);
        }
      });
  }, []);

  const searchFn = e => {
    if (e) {
      let filterdata = data.filter(item => {
        let particularData = item.name && item.name.toUpperCase();
        let userValue = e.toUpperCase();
        return particularData.indexOf(userValue) > -1;
      });
      setItem(filterdata);
    }
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <ImageBackground
        blurRadius={50}
        style={{
          width: '100%',
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../images/home.png')}>
        <TextInput
          placeholder="Enter here."
          style={{
            width: '90%',
            height: 65,
            backgroundColor: '#fad7a0',
            borderRadius: 10,
            paddingHorizontal: 15,
            fontSize: 16,
            color: '#1D1200',
          }}
          placeholderTextColor={'#1D1200'}
          onChangeText={e => searchFn(e)}
        />
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{position: 'absolute', right: 15, top: 15}}>
          <Icon name="menu" color="#000" size={27} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={{padding: 20, width: '100%', height: '78%'}}>
        {/* heading */}
        <View style={{paddingBottom: 10}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#1D1200'}}>
            All Pizza
          </Text>
        </View>

        {item && item.length > 0 ? (
          <ScrollView style={{marginBottom: 15}}>
            {item &&
              item.length > 0 &&
              item.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigate('ProductDetail', value)}
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
                    <View>
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
          <ScrollView style={{marginBottom: 15}}>
            {data &&
              data.length > 0 &&
              data.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigate('ProductDetail', value)}
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
                    <View>
                      <Image
                        style={{width: 85, height: 85, borderRadius: 10}}
                        source={require('../../images/pizza.webp')}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

export default HomePage;
