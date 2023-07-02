import { View, Text, TextInput , StyleSheet, Pressable, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase , db} from '../../firebase'

const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email : Yup.string().email().required('An email is required'),
        username : Yup.string().required().min(2 , 'A username is required'),
        password : Yup.string().required().min(8 , 'Your password has to be atleast 8 characters')
      }) 

    const getRandomProfilePicture = async () => {
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json()
      return data.results[0].picture.large
    }  

    const onSignup = async(email,password,username) =>{
      try{
        const authUser =  await firebase.auth().createUserWithEmailAndPassword(email , password)
        console.log('✅ Firebase user created successfully')
        db.collection('users').doc(authUser.user.email).set({
          owner_uid : authUser.user.uid,
          username : username,
          email : authUser.user.email,
          profile_picture : await getRandomProfilePicture()
        })
      } catch(error){
        Alert.alert('Email already exits',
        error.message + '\n\n would you want to log in',
        [
          {
            text : 'OK',
            style : 'cancel'
          },
          {
            text : 'Log in',
            onPress : () => navigation.goBack(),
          }
        ]
        )
      }
    }
  return (
    <View>
      <View style={styles.wrapper}>
        <Formik
          initialValues={{email:'' ,username : '', password:''}}
          onSubmit={values => {
            onSignup(values.email , values.password , values.username)
          }}
          validationSchema={SignupFormSchema}
          validateOnMount={true}
        >
            {({ handleBlur ,
                handleChange , 
                handleSubmit , 
                values , 
                isValid}) => (
           <>
            
                <View 
                  style={[
                      styles.inputFeild,
                      {   borderColor:
                            values.email.length < 1 || Validator.validate(values.email)
                             ? '#ccc'
                             : 'red',
                            
                      },
                  ]}
                >
                   <TextInput
                     placeholderTextColor='#444'
                     placeholder='Email'
                     autoCapitalize='none'
                     keyboardType='email-address'
                     autoFocus={true}
                     onChangeText={handleChange('email')}
                     onBlur={handleBlur('email')}
                     value={values.email}
                   />
                </View>
                <View 
                  style={[
                      styles.inputFeild,
                      {   borderColor:
                            values.username.length < 1 || values.username.length >= 1
                             ? '#ccc'
                             : 'red',
                            
                      },
                  ]}
                >
                   <TextInput
                     placeholderTextColor='#444'
                     placeholder='Username'
                     autoCapitalize='none'
                     textContentType='username'
                     onChangeText={handleChange('username')}
                     onBlur={handleBlur('username')}
                     value={values.username}
                   />
                </View>
                <View style={[
                      styles.inputFeild,
                      {
                        borderColor: 
                         1 > values.password.length || values.password.length >= 6
                         ? '#ccc'
                         : 'red',
                        
                      }
                      ]}>
                   <TextInput
                     placeholderTextColor='#444'
                     placeholder='Password'
                     autoCapitalize='none'
                     secureTextEntry={true}
                     textContentType='password'
                     onChangeText={handleChange('password')}
                     onBlur={handleBlur('password')}
                     value={values.password}
                   />
        
                </View>   
        
              <Pressable 
                titleSize={20} 
                style={styles.button(isValid)} 
                onPress={handleSubmit}
                >
                <Text style={styles.buttontext}>Sign up</Text>
              </Pressable>
        
               <View style={styles.loginContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{color:'#6BB0F5'}}>Log In</Text>
                </TouchableOpacity>
              </View>
      </>
      )}
      </Formik>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper : {
        marginTop:80
    },
    inputFeild : {
        borderRadius:4,
        padding:12,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1
    },
    button : isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems:'center',
        justifyContent:'center',
        minHeight: 42,
        borderRadius:4
    }),
    buttontext : {
        fontWeight:600,
        color:'#fff',
        fontSize : 20

    },
    loginContainer : {
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50
    }
})

export default SignupForm