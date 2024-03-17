import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser, updateUser } from "../contexts/UserContext"; // Import updateUser from UserContext

const Login = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Destructure setUser from useUser

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.118:5000/login', {
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
        
        console.log('Login successful');
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Error: Invalid Credentials')
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      Alert.alert('Error', error.data)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        onChangeText={setUserId}
        value={userId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

// Define your signup component
const Signup = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('http://192.168.8.101:5000/signup', {
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
  };

  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        onChangeText={setUserId}
        value={userId}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export { Login, Signup };
