import {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

function ProductDetail({navigation, route}) {
  let [data, setData] = useState();

  useEffect(() => {
    setData(route.params);
  }, []);

  const navigate = (name, e) => {
    navigation.navigate(name, e);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        paddingBottom: 20,
      }}>
      <Image
        style={{width: '95%', borderRadius: 10, marginBottom: 15}}
        source={require('../../images/pizza.webp')}
      />
      {/* detail */}
      <ScrollView
        style={{
          width: '95%',
          backgroundColor: '#eee',
          borderRadius: 10,
        }}
        contentContainerStyle={{
          padding: 20,
        }}>
        <View
          style={{
            width: '100%',
            marginVertical: 10,
          }}>
          <View style={{paddingBottom: 15, width: '100%'}}>
            <Text style={{fontSize: 25, color: '#1D1200', fontWeight: 'bold'}}>
              {data && data.name}
            </Text>
            <Text style={{fontSize: 18, color: '#000'}}>
              {data && data.description}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#1D1200'}}>
              Rs {data && data.price}
            </Text>
          </View>
        </View>
        {/* button */}
        <TouchableOpacity
          onPress={() => navigate('Information', data)}
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#F7C16B',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ProductDetail;
