import RNLocation from 'react-native-location';
import {useState} from 'react';
import {getStatusFromRst} from './getLocationStatus';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


export const geoLocation = async ()=>{

    RNLocation.configure({
        distanceFilter:2,
        desiredAccuracy:{
          android:'balancedPowerAccuracy'
        },
        androidProvider:'auto',
        interval:200,
        maxWaitTime:1000
    })
    const granted = await RNLocation.requestPermission({
      android: {
        detail: 'fine'
      }
    });
    if (granted) {
      console.log("PERMISSION GRANTED....");
      const locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
        console.log("LOCATIONS ::: ", locations[locations.length - 1]);
        const result = locations[locations.length - 1];
        // setState({
        //   latitude:result.latitude,
        //   longitude:result.longitude
        // })
        const msg = getStatusFromRst(result.latitude,result.longitude);
        return {result,msg};
      });
      return locationSubscription;
    }
}

export const Location = ()=>{
    const [state,setState] = useState({
        latitude:0,
        longitude:0
    });
    const [alertMessage,setAlertMessage] = useState()
    const response = geoLocation().then((result:any)=>{
        setState({
            latitude:result.latitude,
            longitude:result.longitude
        })
        setAlertMessage(result.msg);
    })

  return(
    <View style = {styles.sectionContainer}>
      <Button 
      onPress={geoLocation}
      title="Punch In"
      color='blue'
      />
    {(state.longitude && state.latitude)?
     <Text>my loc is : {state.latitude} , {state.longitude}</Text> 
     :
     <Text>location detected error</Text> 
    }
    <Text>{insideRestaurent}</Text>

  </View> 
  )
}