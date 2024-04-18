import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from "@expo/vector-icons"
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = 'oauth_google',
  Facebook = 'oauth_facebook'
}

const Page = () => {

  useWarmUpBrowser();

  const router =  useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth ({strategy: 'oauth_google'});
  const { startOAuthFlow: facebookAuth } = useOAuth ({strategy: 'oauth_facebook'});
  
  const onSelectAuth= async (strategy: Strategy) => {
    const seletedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try{
      const { createdSessionId, setActive } = await seletedAuth();

      console.log("--created session id: ", createdSessionId);

      if (createdSessionId) {
        setActive!({session: createdSessionId})
        router.back();
      }
    } catch (err) {
        console.error('OAuth error: ', err);
    }
  }
  
  
  
  return (
    <View style={styles.container}>
      <Image style={styles.homeImage} source={require('@/assets/images/home.png')} />

          <View  style={styles.bottomcontainer}>
            <View style={styles.header}>
              <Text style={styles.appName}> Holiday Home</Text>
              <Image style={styles.logoImage} 
              source={require('@/assets/images/logo_home.png')}
              />
            </View>
            <TouchableOpacity style={styles.btnOutline} onPress={ () => onSelectAuth(Strategy.Google)}>
              <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
              <Text> Continue With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutline} onPress={ () => onSelectAuth(Strategy.Facebook)}>
              <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
              <Text> Continue With Facbook</Text>
            </TouchableOpacity>
          </View>
          

    </View>

  )
}
const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
  },
  appName: {
    fontFamily: 'mon-sb',
    fontSize: 24,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  bottomcontainer: {
    gap: 25,
    borderRadius: 10,
  },
  homeImage: {
    width: 395,
    height: 300,
    borderRadius: 15,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height:50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginLeft: 26,
    marginRight: 26,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  }
})
export default Page