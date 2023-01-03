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
      }}>
      <Image
        style={{width: '95%', height: 300, borderRadius: 10}}
        source={require('../../images/pizza.webp')}
      />
      {/* detail */}
      <View
        style={{
          width: '95%',
          marginVertical: 10,
          marginBottom: 15,
          height: '30%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{
            width: '100%',
            marginVertical: 10,
          }}
          contentContainerStyle={{
            backgroundColor: '#FCF1DF',
            padding: 10,
            borderRadius: 10,
            minHeight: 100,
            justifyContent: 'space-between',
          }}
          estedScrollEnabled={true}>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
              {data && data.name}
            </Text>
            <Text style={{fontSize: 14, color: '#000'}}>
              {data && data.description}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#1D1200'}}>
              Rs {data && data.price}
            </Text>
          </View>
        </ScrollView>
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
      </View>
    </View>
  );
}

export default ProductDetail;
