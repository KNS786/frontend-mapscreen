import React,{Component, useEffect, useState} from 'react';
import RNLocation from 'react-native-location'
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';
import MapScreen from '../MapScreen';



const RootScreen = (props)=>{
  console.log("Root Screen Props :::: ", props );
  // const location = props ;
    // create background task 
    // get Current Location
    // Each location share or props data in Map Component
    RNLocation.configure({
      distanceFilter: 5, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
      },
      // Android only
      androidProvider: "auto",
      interval: 10, // Milliseconds
      maxWaitTime: 100, // Milliseconds
      // iOS Only
      activityType: "other",
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: "portrait",
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    })

    const [locationStatus,setLocationStatus] = useState(false);
    const [punchIn,setPunchIn] = useState(false);
    const [punchInMessage,setPunchInMessage] = useState();
    const [location,setLocation] = useState({
      latitude:null,
      longitude:null
    }) 
 
    const fetchLocationStatus = async (latitude,longitude) => {
      try{
      console.log("getting ....." ,latitude,longitude);
      const reqbody = {"latitude":latitude,"longitude":longitude}
      const requestOptions = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(reqbody)
      }
      
      console.log("REQUEST OPTIONS :::" , requestOptions);
      const response = await fetch('http:192.168.179.226:5000/api/emplocation',requestOptions)
      const json = await response.json();
      console.log("LOCATION STATUS ::::: ", json.present);
      setLocationStatus(json.present)
      ReactNativeForegroundService.update({id:444,title:'totalQSR',message:json.msg})
      //User Reached Store Location is `true` process is stoped 
      if(json.present){
        ReactNativeForegroundService.stop();
        console.log("PROCESS STOPED");
      }
      console.log(json);
      return json;
      
      }catch(Exception){
      console.log("Exception has ocuured" , error);
      
      }
    }
      
      const getGrantedPermission = async()=>{   
        const granted = await RNLocation.requestPermission({
            android: {
              detail: 'fine'
            }
          });
          if (granted) {
            console.log("PERMISSION GRANTED....");
            const locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
              console.log("LOCATIONS ::: ", locations[locations.length - 1]);
              const getCurrentLocation = locations[locations.length - 1];
              console.log("GET CURRENT LOCATIONS :: " , getCurrentLocation);           
              if(getCurrentLocation){
                fetchLocationStatus(getCurrentLocation.latitude,getCurrentLocation.longitude);
              return getCurrentLocation;
            };
            return locationSubscription;
          })
      }
    }

    ReactNativeForegroundService.add_task(
      () => getGrantedPermission(),
      {
          delay: 100,
          onLoop: true,
          taskId: 'taskid',
          onError: (e) => console.log(`Error logging:`, e),
      }
    );
    
  return(
    <MapScreen
     latitude = {location.latitude}
     longitude = {location.longitude}
    />  
  )

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default RootScreen;