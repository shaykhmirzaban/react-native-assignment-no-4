import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function ProductDetail() {
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
      <ScrollView style={{width: '95%', marginVertical: 10, marginBottom: 15}}>
        <View
          style={{
            justifyContent: 'space-between',
            backgroundColor: '#FCF1DF',
            width: '100%',
            marginVertical: 10,
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontSize: 18, color: '#1D1200', fontWeight: 'bold'}}>
              Chicken Ranch
            </Text>
            <Text style={{fontSize: 14, color: '#000'}}>
              Chicken, Cheses, etc.
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#1D1200'}}>
              Rs 700
            </Text>
          </View>
        </View>
        {/* button */}
        <TouchableOpacity
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
