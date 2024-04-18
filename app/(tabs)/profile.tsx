import { View, Text, Button, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Tabs } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);


  const [apidata,setData] = useState([]);
  const [loading, setloading] = useState(true)
  const url = "http://10.0.2.2:3000/profile";
  const getAPIdata = async () => {
    // let result = await fetch(url);
    // result = await result.json();
    // console.warn(result);
    fetch(url)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setloading(false))

  }

  useEffect(() => {
    if(!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);


  


  return (

    <SafeAreaView style={ defaultStyles.container }>
      <View style={styles.headerContainer} >
        <Text style={styles.header}>Profile</Text>
        <Ionicons name='notifications-outline' size={26}/>
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar } />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }} >
              <View style={styles.editRow}>
                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }} >
                  {firstName} {lastName}
                </Text>
              </View>
              
          </View>
          <Text>{email}</Text>
          <Text> Since {user?.createdAt?.toLocaleDateString()} </Text>
        </View>
      )}

      <View style={styles.cart}>
        {
          loading ? <Text> Loading...... </Text>: (
            [apidata].map((post)=> (
              <View style={styles.cardStyle}>
                <View>
                  <View style={styles.houseName} >
                    <MaterialIcons name="house" size={25} color="black" />
                    <Text style={styles.title}>
                    {post.name}
                    </Text>
                  </View>
                  <View style={styles.locationName}>
                  <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={styles.location}>
                    {post.location}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}> 
                    <Ionicons name="star" size={24} color="black" />
                    <Text style={styles.rating}>
                      {post.rating / 20}
                    </Text>
                  </View>
                  
                  <Text style={styles.price}>
                  ৳ {post.prince * 118}
                  </Text>
                </View>
              </View>
              ))
          )
        }
      </View>
      <TouchableOpacity style={[defaultStyles.btn, {paddingHorizontal: 20, marginLeft: 100, marginRight: 100, marginBottom:20, marginTop: 20}]} onPress={getAPIdata} >
        <Text>Refresh</Text>
      </TouchableOpacity>

      {isSignedIn && <View>
        <Button  title='Log out' onPress={() => signOut()}/>
        </View>
        }


      {!isSignedIn && (
        <Link href={'/(modals)/login'} asChild >
          <Button title="Log in" color={Colors.dark}/>
        </Link>
      )

      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  locationName:{
    width: 220, 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  houseName: {
    width: 220, 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  cardStyle: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  cart: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    padding: 3,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 8,
    paddingLeft: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    padding: 18,
  },
  header: {
    fontFamily: 'mon-sb',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
})


export default Page;