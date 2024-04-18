import { View, Text, ListRenderItem, TouchableOpacity,StyleSheet,Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';


interface Props {
  listings: any[];
  category: string;
}

const Listings = ({listings: items, category}: Props) => {

  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList> (null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() =>{
      setLoading(false);
    },10)
  }, [category]);

  const renderRow: ListRenderItem<any> = ({item}) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.Listing} entering={FadeInRight} exiting={FadeInLeft}>
          <Image source={{uri: item.medium_url }} style={styles.image}/>
          <TouchableOpacity style={{ position: 'absolute', right: 30, top:30 }}>
            <Ionicons name="heart-outline" size={24} color={'#000'} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }} >{item.name}</Text>
            <View style={{flexDirection: 'row', gap: 4}}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: 'mon-sb' }} > {item.review_scores_rating / 20 } </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontFamily: 'mon' }} >{item.room_type}</Text>

            <View style={{ flexDirection: 'row', gap: 4 }} >
              <Text style={{ fontFamily: 'mon-sb' }} > ৳ {item.price * 118}</Text>
              <Text style={{ fontFamily: 'mon' }} > per night </Text>
            </View>
          </View>

        </Animated.View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style= {defaultStyles.container}>
      <FlatList 
      renderItem={renderRow}
      ref={listRef}
      data={loading ? [] : items}
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
})

export default Listings