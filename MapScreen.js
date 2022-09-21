import React,{Component, useEffect, useState} from 'react';

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
import MapView, { Marker,Circle } from 'react-native-maps';

export const MapScreen = (props)=>{
  console.log("props :: " , props );
    const coords = {latitude:10.013246,longitude:76.330070}
    const restaurant = {latitude:10.012971,longitude: 76.331186}
    return(
        <MapView style = {styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude:coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
    <Marker
      key={1}
      coordinate={coords}
      title={"I am here"}
      description={"stand here"}
    />
       <Marker
      key={2}
      coordinate={restaurant}
      title={"I am here"}
      description={"stand here"}
    />
    <Circle
      center={restaurant}
      fillColor={"yellow"}
      strokeWidth={2}
      strokeColor={'blue'}
      radius={10}
    />
      </MapView>

    );
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
    map:{
        width:'100%',
        height:'100%'
    }
  });

export default MapScreen;