import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image,Alert } from 'react-native';
import { SIZES } from '../constants';
import styles from './auth.styles';
import {API_URL} from '@env'
// Define your signup component
const Signup = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async () => {
      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, name: name, password: password }),
        });
        const data = await response.json();
  
        console.log('Signup successful');
        Alert.alert('Sign up successful')
      } catch (error) {
        console.error('Error occurred during signup:', error);
      }
      navigation.navigate('Login');
    };
  
    return (
      <View style={styles.container}>
        <Image
            source={require('../assets/images/nicebg.jpg')}
            style={{height:SIZES.height, width:SIZES.width, resizeMode: 'cover'}}
        />
        <View style={styles.innerCont}>
            <Text style={styles.login}>Sign Up</Text>
            <Text style={styles.label}>User ID</Text>
            <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={setUserId}
                value={userId}
            />
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.loginCont} onPress={handleSignup} >
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Login')}>
          <View  style={{flexDirection:"row"}}>
          <Text style={styles.signtext}>Have an account? </Text>
          <Text style={{ color: '#4d8076', fontSize:15, fontFamily: "regular",}}>Login</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Signup;


  
 
  