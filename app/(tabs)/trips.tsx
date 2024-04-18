import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Stack, Tabs } from 'expo-router';
import Listings from '@/components/Listings';
import Listingsdata from '@/assets/data/airbnb-listings.json';
import ExploreHeader from '@/components/ExploreHeader';
import ListingsMap from '@/components/ListingsMap';
import ListingsDataGeo from '@/assets/data/airbnb-listings.geo.json';

const Page2 = () => {
  const [ category, selectCategory] = useState('Tiny homes');

  const intems = useMemo(() => Listingsdata as any, []);

  const onDataChanged = (category: string) => {
    selectCategory(category);
  }

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>,
        }}
      />
      <ListingsMap listings={ListingsDataGeo}/>
    </View>
  );
};

export default Page2;