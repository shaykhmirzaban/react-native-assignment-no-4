import {useEffect, useState} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';

// firebase
import database from '@react-native-firebase/database';

function AdminUserPage() {
  let [data, setData] = useState([{}, {}]);

  useEffect(() => {
    database()
      .ref('CustomerOrder')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          setData(Object.values(snapshort.val()));
        }
      });
  }, []);

  return (
    <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
      {/* all customer order */}
      <View
        style={{
          width: '100%',
          backgroundColor: '#F7C16B',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>
          All Customer Order
        </Text>
      </View>

      {/* order list */}
      <ScrollView style={{padding: 15}}>
        {data && data.length > 0 ? (
          data.map((value, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#eee',
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 22, color: '#000', paddingBottom: 5}}>
                  {value.name}
                </Text>
                <Text style={{fontSize: 18, color: '#000', paddingBottom: 5}}>
                  {value.date}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                    paddingBottom: 5,
                    fontWeight: 'bold',
                  }}>
                  Rs {value.totalPrice}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <View>
            <Text>Empty Order</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default AdminUserPage;
