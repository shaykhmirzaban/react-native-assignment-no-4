import {ScrollView} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
function LastDetailScreen() {
    let 
  Geolocation.getCurrentPosition(
    //Will give you the current location
    position => {
      //getting the Longitude from the location json
      const currentLongitude = JSON.stringify(position.coords.longitude);

      //getting the Latitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
    },
    error => alert(error.message),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    },
  );
  return <ScrollView style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
  </ScrollView>;
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default LastDetailScreen;
