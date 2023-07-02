import { View, Text, TextInput , StyleSheet, Pressable, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import SignupScreen from '../../screens/SignupScreen'
import {firebase , db} from '../../firebase'


const LoginForm = ({navigation}) => {
  const LoginFormSchema = Yup.object().shape({
    email : Yup.string().email().required('An email is required'),
    password : Yup.string().required().min(8 , 'Your password has to be atleast 8 characters')
  }) 

  const onLogin = async (email,password) =>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
      console.log(' ✅ firebase Login Successfully 🔥')
    } catch(error){
      
      Alert.alert( 'wrong password or email',
      error.message + '\n\n what would you like to do...',
      [
        {
          text: 'OK',
          onPress : () => console.log('ok'),
          style : 'cancel'
        },
        {
          text : 'Sign up',
          onPress : () => navigation.push('SignupScreen')
        }
      ]
      )
    }
  }
  return (
    <View style={styles.wrapper}>
        <Formik
          initialValues={{email:'' , password:''}}
          onSubmit={values => {
            onLogin(values.email , values.password)
            
          }}
          validationSchema={LoginFormSchema}
          validateOnMount={true}
        >
            {({ handleChange ,
                handleBlur , 
                handleSubmit , 
                values , 
                errors ,
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
                     placeholder='Phone number , username or email'
                     autoCapitalize='none'
                     keyboardType='email-address'
                     textContentType='emailAddress'
                     autoFocus={true}
                     onChangeText={handleChange('email')}
                     onBlur={handleBlur('email')}
                     value={values.email}
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
                     autoCorrect={false}
                     secureTextEntry={true}
                     textContentType='password'
                     onChangeText={handleChange('password')}
                     onBlur={handleBlur('password')}
                     value={values.password}
                   />
        
                </View>   
        
              <View style={{alignItems:'flex-end',marginBottom:30}}>
                <Text style={{color:'#6BB0F5'}}>Forgot password?</Text>
              </View>
        
              <Pressable 
                titleSize={20} 
                style={styles.button(isValid)} 
                onPress={handleSubmit}
                >
                <Text style={styles.buttontext}>Log in</Text>
              </Pressable>
        
               <View style={styles.signupContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                    <Text style={{color:'#6BB0F5'}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
      </>
      )}
      </Formik>
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
    signupContainer : {
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50
    }
})
export default LoginForm

//line 108(isValid) + line 37(values.email.length)