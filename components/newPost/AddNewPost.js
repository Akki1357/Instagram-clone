import React from 'react'
import { Text, View , Image, TouchableOpacity, StyleSheet} from 'react-native'
import { FormikPostUploader } from './FormikPostUploader'

export const AddNewPost = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
    
  )
}

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image 
           source = {{uri : 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
           style={{width:30,height:30}}
        />
        </TouchableOpacity>
        <Text style={styles.headerText}>NewPost</Text>
        <Text></Text>
    </View>
)
const styles = StyleSheet.create({
    container : {
        marginHorizontal:10
    },

    headerContainer : {
        flexDirection:'row',
        justifyContent:'space-between',
    },

    headerText : {
        color:'#fff',
        fontWeight:700,
        fontSize : 20,
        
    }
})
