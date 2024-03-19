import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import style from "./profile.styles";
import { COLORS } from "../constants";
import { useUser } from "../contexts/UserContext";
import axios from 'axios';
import { API_URL } from '@env';

const Profile = ({ navigation }) => {
  const { userData, setUser } = useUser();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosedConditions, setDiagnosedConditions] = useState("");

  useEffect(() => {
    if (!userData) {
      navigation.navigate('Login');
    } else {
      fetchUserProfile();
    }
  }, [userData, navigation]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userData.user_id}`);
      if (response.status === 200) {
        const userData = response.data;
        setName(userData.name || "");
        setAge(userData.age ? String(userData.age) : "");
        setDiagnosedConditions(userData.diagnosed_conditions ? userData.diagnosed_conditions.join(", ") : "");
      } else {
        Alert.alert("Error", "Failed to fetch user profile.");
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert("Error", "An error occurred while fetching user profile. Please try again later.");
    }
  };

  const updateUserProfile = async () => {
    try {
      const response = await axios.put(`${API_URL}/profile/${userData.user_id}`, {
        name,
        age: parseInt(age),
        diagnosed_conditions: diagnosedConditions.split(",").map(condition => condition.trim())
      });
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully.");
        navigation.navigate('Home')
      } else {
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert("Error", "An error occurred while updating profile. Please try again later.");
    }
  };

  const deleteAccount = async () => {
    try {
      // Implement account deletion logic here
    } catch (error) {
      console.error('Error deleting account:', error);
      // Alert.alert("Error", "An error occurred while deleting account. Please try again later.");
    }
  };

  const logout = () => {
    setUser(null); // Clear user data from context
    navigation.navigate('Login'); // Navigate to login screen
  };

  return (
    <ScrollView style={style.container}>
      <StatusBar barStyle="white-content" backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <View style={style.coverCont}>
        <View style={style.cover}>
          <View style={style.profilePictureContainer}>
            <Image
              source={require('../assets/images/mali2bg.png')} // Add the path to your dummy profile picture
              style={style.profilePicture}
            />
          </View>
          </View>
          <Text style={style.name}>{userData ? userData.name : ""}</Text>
          {userData ? (
            <View style={style.loginBtn}>
              <Text style={style.email}>{userData.email}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
              <View style={style.loginBtn}>
                <Text style={style.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={style.profileContainer}>
          {userData && (
            <View style={style.menuWrapper}>
              <Text style={style.sectionHeader}>My Account</Text>
              <View style={style.menuItem}>
                <Text style={style.label}>Name:</Text>
                <TextInput
                  style={style.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Update your Name"
                />
              </View>
              <View style={style.menuItem}>
                <Text style={style.label}>Age:</Text>
                <TextInput
                  style={style.input}
                  value={age}
                  onChangeText={setAge}
                  placeholder="Update your Age"
                  keyboardType="numeric"
                />
              </View>
              <View style={style.menuItem}>
                <Text style={style.label}>Diagnosed Conditions:</Text>
                <TextInput
                  style={style.input}
                  value={diagnosedConditions}
                  onChangeText={setDiagnosedConditions}
                  placeholder="Diagnosed Conditions (comma-separated)"
                />
              </View>
              <TouchableOpacity onPress={updateUserProfile}>
                <View style={style.button}>
                  <Text style={style.buttonText}>Update Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <View style={[style.button, style.logoutButton]}>
                  <Text style={style.buttonText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
