import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { SafeAreaView, Text , StyleSheet} from 'react-native'
import { Header } from '../components/home/Header'
import { Stories } from '../components/home/Stories'
import { Post } from '../components/home/Post'
import { POSTS } from '../data/posts'
import { BottomTabs, bottomTabIcons } from '../components/home/BottomTabs'
import { db } from '../firebase'

export const HomeScreen = ({navigation}) => {
  const [posts , setPosts] = useState([])

  useEffect(() => {
    db.collectionGroup('posts')
    .orderBy('createdAt','desc')
    .onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(post => ({id:post.id, ...post.data()})))
    })
  },[])

  return (
    <SafeAreaView style={styles.container}>
     <Header navigation={navigation} />
     <Stories/>
     <ScrollView>
        {posts.map((post,index) => (
          <Post post={post} key={index} />
        ))}
     </ScrollView>
     <BottomTabs icons={bottomTabIcons}/>
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
