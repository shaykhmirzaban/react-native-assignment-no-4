import {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

function HomePage({navigation}) {
  let [data, setData] = useState([]);
  let [item, setItem] = useState([]);

  const navigate = name => {
    navigation.navigate(name);
  };

  const searchFn = e => {
    if (e) {
      let filterdata = data.filter(item => {
        let particularData = item[name] && item[name].toUpperCase();
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
            color: '#fff',
          }}
          placeholderTextColor={'#fff'}
          onChangeText={e => searchFn(e)}
        />
      </ImageBackground>

      <View style={{padding: 20, width: '100%', height: '70%'}}>
        {/* heading */}
        <View style={{paddingBottom: 10}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#1D1200'}}>
            All Pizza
          </Text>
        </View>
        <ScrollView style={{marginBottom: 15}}>
          <TouchableOpacity
            onPress={() => navigate('ProductDetail')}
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
                  style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
                  Chicken Ranch
                </Text>
                <Text style={{fontSize: 14, color: '#000'}}>
                  Chicken, Cheses, etc.
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#1D1200'}}>
                  Rs 700
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
          <View
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
                  style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
                  Chicken Ranch
                </Text>
                <Text style={{fontSize: 14, color: '#000'}}>
                  Chicken, Cheses, etc.
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#1D1200'}}>
                  Rs 700
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
          </View>
          <View
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
                  style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
                  Chicken Ranch
                </Text>
                <Text style={{fontSize: 14, color: '#000'}}>
                  Chicken, Cheses, etc.
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#1D1200'}}>
                  Rs 700
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
          </View>
          <View
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
                  style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
                  Chicken Ranch
                </Text>
                <Text style={{fontSize: 14, color: '#000'}}>
                  Chicken, Cheses, etc.
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#1D1200'}}>
                  Rs 700
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default HomePage;
