// import React in our code
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// import all the components we are going to use
import {View, Text, StyleSheet, ScrollView} from 'react-native';

//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');

  useEffect(() => {
    getOneTimeLocation();
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: currentLatitude ? Number(currentLatitude) : 37.78825,
            longitude: currentLongitude ? Number(currentLongitude) : -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>

      <ScrollView
        style={{
          width: '90%',
          margin: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#000',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          Your Current Location
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{fontSize: 16, color: '#333'}}>
            Latitude: {currentLatitude}
          </Text>
          <Text style={{fontSize: 16, color: '#333'}}>
            Longitude: {currentLongitude}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
