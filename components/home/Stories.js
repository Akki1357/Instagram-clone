import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { USERS } from '../../data/Users'


export const Stories = () => {
  return (
    <View style={{marginBottom:13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story,index) => (
          <View key={index} style={{alignItems:'center'}}>
            <Image source={{uri:story.Image}}
            style={styles.story} />
            <Text style={{color:'white'}}>{
              story.user.length > 10 ? story.user.slice(0,6).toLowerCase() + '...' 
              : story.user.toLowerCase()}
            </Text>
           </View>
        ))}
      </ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({
  story :{
    width:70,
    height:70,
    borderRadius:50,
    marginLeft:18,
    borderWidth:3,
    borderColor:'#ff8501',

  },
})