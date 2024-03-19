import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { SIZES } from '../constants';
import styles from './auth.styles';

// Define your signup component
const Signup = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async () => {
      try {
        const response = await fetch('http://192.168.0.112:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, name: name, password: password }),
        });
        const data = await response.json();
  
        console.log('Signup successful');
        navigation.navigate('Home');
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
        </View>
      </View>
    );
  };
  
  export default Signup;


  
 
  