import Icon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
const {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} = require('react-native');

// firebase
import database from '@react-native-firebase/database';

// css style
import Styles from '../boilerplate/globalStyle';

function Home() {
  let [currentValue, setCurrentValue] = useState('');
  let [data, setData] = useState([]);

  const getItem = () => {
    database()
      .ref('TodoItem')
      .on('value', snapshort => {
        if (snapshort.exists()) {
          let item = snapshort.val();
          setData(Object.values(item));
        }
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  const addItem = () => {
    let id = database().ref('TodoItem/').push().key;
    database()
      .ref('TodoItem/' + id)
      .set({
        text: currentValue,
        id: id,
      })
      .then(() => {
        console.log('successfully added');
        getItem();
      })
      .catch(() => console.log('Something want wrong'));
  };

  const deleteItem = id => {
    database().ref(`TodoItem/${id}`).remove();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      {/* heading */}
      <View style={{marginVertical: 15}}>
        <Text style={[Styles.fwb, Styles.fs4, {color: '#333'}]}>
          Todo Application
        </Text>
      </View>
      {/* Add Todo */}
      <View style={[Styles.fdr, Styles.jcs, Styles.aic]}>
        <TextInput
          onChangeText={e => setCurrentValue(e)}
          placeholder="Enter here..."
          style={[Styles.inputArea, Styles.w75]}
        />
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#333',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={addItem}>
          <Text style={{color: '#fff', fontSize: 15}}>Add</Text>
        </TouchableOpacity>
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
          data.map(value => {
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
                    onPress={() => deleteItem(value.id)}
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

export default Home;
