import React from 'react'
import {StyleSheet , StatusBar , SafeAreaView} from 'react-native'
import { AddNewPost } from '../components/newPost/AddNewPost'

export const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'black',
        flex:1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    
})
