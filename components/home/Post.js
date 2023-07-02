import React, { useState , useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { firebase , db } from '../../firebase'

const postFooterIcons = [
  {
    name : 'Like',
    imageurl : '',
    likedImageurl : '',
  }
]
export const Post = ({post}) => {
  const handleLike = post => {
    currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    )

    db.collection('users')
         .doc(post.owner_email)
         .collection('posts')
         .doc(post.id)
         .update({
             likes_by_users : currentLikeStatus
             ? firebase.firestore.FieldValue.arrayUnion(
                  firebase.auth().currentUser.email
                )
             : firebase.firestore.FieldValue.arrayRemove(
                  firebase.auth().currentUser.email
             ),  
         })
         .then(() => {
            console.log('✅Documents successfully updated')
         })
         .catch(error => {
            console.error('Error updating documents:',error)
         })
  }
  return (
    <View style={{marginBottom:30}}>
        <Divider width={1} orientation='vertical'/>
        <PostHeader post={post}/>
        <PostImage post={post}/>
        <View style={{marginHorizontal:15,marginTop:10}}>
          <PostFooter post={post} handleLike={handleLike} />
          <Likes post={post}/>
          <Caption post={post}/>
          <CommentsSection post={post}/>
          <Comments post={post}/>
        </View>

        
    </View>
  )
}

const PostHeader = ({post}) => (
    <View 
    style={{
      flexDirection:'row',
      justifyContent:'space-between',
      margin:5,
      alignItems:'center'
      }}
    >
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image source={{uri: post.profile_picture}} style={styles.story} />
        <Text style={{color:'white', marginLeft:5,fontWeight:700}}>{post.user}</Text>
      </View>
      
      <Text style={{color:'white' , fontWeight:900 }}>...</Text>
      
    </View>
)

const PostImage = ({post}) =>(
  <View style={{width:'100%' , height:450}}>
    <Image source={{uri:post.imageUrl}} style={{height:'100%',resizeMode:'cover',}} />
  </View>
)

const PostFooter = ({handleLike,post}) => (
  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
    <View style={{flexDirection:'row',width:'32%',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={() => handleLike(post)}>
    <Image style={styles.footerIcon}
     source = { post.likes_by_users.includes(firebase.auth().currentUser.email)
       ? require('../../assets/heart.png')
       : require('../../assets/heartIcon.png')
      }/>
    </TouchableOpacity>
    <TouchableOpacity>
    <Image style={styles.footerIcon} source = {require('../../assets/comment.png')}/>
    </TouchableOpacity>
    <TouchableOpacity>
    <Image style={styles.footerIcon} source = {require('../../assets/send.png')}/>
    </TouchableOpacity>
    </View>
    <TouchableOpacity>
    <Image style={styles.footerIcon} source = {require('../../assets/save.png')}/>
    </TouchableOpacity>
  </View>
  
)

const Likes = ({post}) => (
  <View style={{flexDirection:'row',marginTop:4}}>
    <Text style={{color:'white' , fontWeight:600}}>
      {post.likes_by_users.length}  likes
    </Text>
  </View>
)

const Caption = ({post}) => (
  <View style={{marginTop:0}}>
  <Text style={{color:'white'}}>
    <Text style={{fontWeight:600}}>{post.user}</Text>
    <Text> {post.caption}</Text>
  </Text>
  </View>
)

const CommentsSection = ({post}) => (
  <View style={{marginTop:5}}>
    {!!post.comments.length && (
      <Text style={{color:'gray'}}>
      View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}
      {post.comments.length > 1 ? ' comments':' comment'}
      </Text>
    )}
  </View>
)

const Comments = ({post}) => (
  <>
  {post.comments.map((comment,index) =>(
    <View key={index} style={{flexDirection:'row',marginTop:5}}>
      <Text style={{color:'white'}}>
        <Text style={{fontWeight:700}}>{comment.user}</Text>
        {' '}{comment.comment}
      </Text>
    </View>
  ))}
  </>
)




const styles = StyleSheet.create({
  story :{
    width:35,
    height:35,
    borderRadius:50,
    marginLeft:6,
    borderWidth:1.6,
    borderColor:'#ff8501',
  },
  footerIcon : {
    width:25,
    height:25
  }
})


