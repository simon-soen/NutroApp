import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import SearchTile from './SearchTile';
import axios from 'axios';
import { useUser } from "../contexts/UserContext";
import { API_URL } from '@env';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { userData, refreshGroceryList } = useUser();

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${API_URL}/recommend_meals`, {
        user_id: userData.user_id,
        meal_name: searchKey
      });
      setSearchResult(response.data.similar_meals);
    } catch (error) {
      console.error('Failed to search:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.cameraButton}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          value={searchKey}
          onChangeText={setSearchKey}
          placeholder="Search optional meal by meal name...."
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.resultContainer}>

      <Text style={styles.title}>Recommendations Based on Your Preferences</Text>
        {searchResult.map((item, index) => (
          <SearchTile key={item._id ? item._id.toString() : index.toString()} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  cameraButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50', // Custom title color
},
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  resultContainer: {
    paddingHorizontal: 0,
  },
});

export default Search;
