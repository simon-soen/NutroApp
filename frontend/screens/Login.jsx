import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser, updateUser } from "../contexts/UserContext"; // Import updateUser from UserContext
import { API_URL } from '@env';
import { SIZES } from '../constants';
import styles from './auth.styles';

const Login = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Destructure setUser from useUser

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, password: password }),
      });
      const data = await response.json();
  
      if (data.access_token) {
        await AsyncStorage.setItem('access_token', data.access_token);
        await AsyncStorage.setItem('user_profile', JSON.stringify(data.user_profile));
        
        // Update user context with fetched data
        setUser(data.user_profile);

        if (data.user_profile.name && data.user_profile.age && data.user_profile.diagnosed_conditions) {
          navigation.navigate('Home');
          
        } else {
          navigation.navigate('Profile'); // Navigate to profile page if necessary data is not available
        }
      } else {
        Alert.alert('Error: Invalid Credentials');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={require('../assets/images/nicebg.jpg')}
          style={{height:SIZES.height, width:SIZES.width, resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.innerCont}>
        <View style={styles.profile}>                
          <Image
            source={require('../assets/images/login.jpeg')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.login}>Login</Text>
        <Text style={styles.label}>User ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your User ID"
          onChangeText={setUserId}
          value={userId}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginCont} onPress={handleLogin} >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Signup')}>
          <View  style={{flexDirection:"row"}}>
            <Text style={styles.signtext}>Don't have an account? </Text>
            <Text style={{ color: '#4d8076', fontSize:15, fontFamily: "regular",}}>Sign up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
