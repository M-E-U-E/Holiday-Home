import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];

interface Props {
  onCategoryChanged: (category: string) => void
}

  const ExploreHeader = ( {onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
  
    const selectCategory = (index: number) => {
      const selected = itemsRef.current[index];
      setActiveIndex(index);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      onCategoryChanged(categories[index].name);
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.Header}>
            <Text style={styles.appName}> Holiday Home</Text>
            <Image style={styles.logoImage} 
            source={require('@/assets/images/logo_home.png')}
            />
          </View>
  
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              gap: 30,
              paddingHorizontal: 16,
            }}>
            {categories.map((item, index) => (
              <TouchableOpacity
                ref={(el) => (itemsRef.current[index] = el)}
                key={index}
                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                onPress={() => selectCategory(index)}>
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={activeIndex === index ? '#000' : Colors.grey}
                />
                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: 130,
      
    },
    logoImage: {
      width: 60,
      height: 60,
    },
    Header: {
      paddingBottom:20,
      paddingLeft: 10,
      paddingRight: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    appName: {
      fontFamily: 'mon-sb',
      fontSize: 24,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
      backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 370,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: Colors.grey,
    },
    categoryTextActive: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: '#000',
    },
    categoriesBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    categoriesBtnActive: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#000',
      borderBottomWidth: 2,
      paddingBottom: 8,
    },
});


export default ExploreHeader