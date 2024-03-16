import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Button, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios'; // for making API calls

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000', {
        username,
        password
      });

      // Handle successful login (e.g., navigate to home screen)
      console.log(response.data);
      navigation.navigate('Home'); // Assuming a home screen exists

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true} // Hide password characters
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
