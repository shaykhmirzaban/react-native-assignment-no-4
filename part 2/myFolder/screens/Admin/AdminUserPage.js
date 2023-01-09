import {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

// firebase
import database from '@react-native-firebase/database';

function AdminUserPage({navigation}) {
  let [data, setData] = useState([]);
  let [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    database()
      .ref('CustomerOrder')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          setData(Object.values(snapshort.val()));
        } else {
          setData([]);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = (name, e) => {
    navigation.navigate(name, e);
  };

  const refreshingFn = () => {
    setRefresh(true);
    setTimeout(() => {
      fetchData();
      setRefresh(false);
    }, 1000);
  };

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
          Customer Order
        </Text>
      </View>

      {/* order list */}
      <ScrollView
        style={{padding: 15}}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refreshingFn} />
        }>
        {data && data.length > 0 ? (
          data.map((value, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigate('SeeCustomerOrderLocation', value)}
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
