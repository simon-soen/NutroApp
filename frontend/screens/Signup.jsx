import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.8.101:5000/signup', {
        user_id: userId,
        name: name,
        password: password,
      });
      if (response.data.success) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
