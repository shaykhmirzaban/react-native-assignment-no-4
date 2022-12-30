import {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
const {View, Text, ScrollView, TouchableOpacity} = require('react-native');
import Icon from 'react-native-vector-icons/MaterialIcons';

function History() {
  let [data, setData] = useState([]);
  useEffect(() => {
    database()
      .ref('TodoItem')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          let data = Object.values(snapshort.val());
          setData(data);
        }
      });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 15,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#333'}}>
          Todo History
        </Text>
      </View>
      {/* Todo Item */}
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          marginVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data &&
          data.length > 0 &&
          data.map((value, index) => {
            return (
              <View
                key={value.id}
                style={{
                  width: '85%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginVertical: 5,
                  backgroundColor: '#eee',
                  padding: 15,
                  borderRadius: 10,
                }}>
                {/* text */}
                <Text style={{color: '#000', fontSize: 16}}>{value.text}</Text>
                {/* button */}
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor: 'red',
                      marginHorizontal: 3,
                    }}>
                    <Icon name="delete" size={25} color={'#fff'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor: 'green',
                      marginHorizontal: 3,
                    }}>
                    <Icon name="edit" size={25} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default History;
