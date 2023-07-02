import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { firebase } from '../../firebase'

const handleSignout = async () =>{
  try{
    await firebase.auth().signOut()
    console.log('signedOut successfully!')
  }catch(error){
    console.log(error)
  }
}
export const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Image style={styles.logo}
               source={require('../../assets/header-logo.png')}
        />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}> 
          <Image style={styles.icon}
             source={require('../../assets/addIcon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity> 
          <Image style={styles.icon}
             source={require('../../assets/heartIcon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity> 
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image style={styles.icon}
             source={require('../../assets/chatIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
      justifyContent:'space-between',
      alignItems: 'center',
      flexDirection:'row',
      marginHorizontal:20,
    },

    iconContainer : {
      flexDirection:'row',
    },

    icon : {
      width:25,
      height:25,
      marginLeft:20,
      resizeMode:'contain',
    },
    logo : {
        width:130,
        height:65,
        //resizeMode:'contain',
    },

    unreadBadge : {
      backgroundColor:'#FF3250',
      position:'absolute',
      left:30,
      bottom:18,
      width:25,
      height:20,
      borderRadius:25,
      alignItems:'center',
      justifyContent:'center',
      zIndex:100,
    },

    unreadBadgeText : {
      color: 'white',
      fontWeight:600,
    },
})
