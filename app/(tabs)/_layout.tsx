import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb',
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size}) => <Ionicons name="search" color={color} size={size}/>
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size}) => <Ionicons name="ios-map-sharp" color={color} size={size}/>
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: 'profile',
          tabBarIcon: ({ color, size}) => <Ionicons
          name="person-circle-outline" color={color} size={size}/>
        }}
      />
    </Tabs>
  )
}

export default Layout