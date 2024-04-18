import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Listing } from '@/interfaces/linsing';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 23.6850,     
    longitude: 90.3563,       
    latitudeDelta: 5,   
    longitudeDelta: 5,        
};


const ListingsMap = ({listings}: Props) => {

    const router = useRouter();

    const onMarkerSelected= (event: any) => {
        router.push(`/listing/${event.properties.id}`);
    };

  return (
    <View style={styles.container} >
      <MapView 
      style={StyleSheet.absoluteFill} 
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterTextColor='#000'
        clusterColor='#fff'
        >
        {listings.features.map((item: any) => (
        <Marker 
            key = {item.properties.id}
            onPress={ ()=> onMarkerSelected(item)}
            coordinate={{
                latitude: +item.properties.latitude,
                longitude: +item.properties.longitude
            }}
        >
            <View style={styles.marker} >
                <Text style={styles.markertext} >৳ {item.properties.price * 118} </Text>
            </View>
        </Marker>
        ))}
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markertext: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
})

export default ListingsMap