import { View, Text, StyleSheet,ScrollView, Dimensions, Image, Share, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing = (listingsData as any[]).find((item) => item.id === id);
    const navigation= useNavigation();

    const shareListing = async() => {
      try{
        await Share.share({
          title: listing.name,
          url: listing.listing_url,
        });
      } catch (err) {
        console.log(err);
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <View>
            <TouchableOpacity style={ styles.roundButton } onPress={shareListing}>
              <Ionicons name="share-outline" size={ 22 } />
            </TouchableOpacity>
          </View>
        )
      })
    })

    const saveData =async () => {

      const url = "http://10.0.2.2:3000/profile"
      let result = await fetch(url,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:listing.name,
          location:listing.smart_location,
          rating:listing.review_scores_rating,
          prince:listing.price,
        })
      });

      result = await result.json();
      if(result){
        Alert.alert('Home Reserved', 'Your Holiday Home has been Reserved', [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ]);
      }

    }



  return (


    <View style={ styles.container }>
      <Animated.ScrollView>
        <Animated.Image source={{ uri: listing.xl_picture_url }} style={styles.image} resizeMode="cover"/>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      
      </Animated.ScrollView>
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200) }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center' }} >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice} >৳ {listing.price * 118} </Text>
            <Text>per night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, {paddingHorizontal: 20}]} onPress={saveData}>
            <Text>Reserve Now</Text>
          </TouchableOpacity>

        </View>

      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: IMG_HEIGHT,
    width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width:40,
    height:40, 
    borderRadius: 50, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
})

export default Page