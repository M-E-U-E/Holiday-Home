import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import ListingsMap from '@/components/ListingsMap';
import Listings from '@/components/Listings'

const Page = () => {


  return (
    <View>

    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    width: "95%",
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  searchtxt: {
    marginLeft: 10,
    fontSize: 15,
  },
})

export default Page