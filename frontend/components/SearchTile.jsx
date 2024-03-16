import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUser } from "../contexts/UserContext";
import axios from 'axios';

const SearchTile = ({ item }) => {
    const { userData, refreshGroceryList } = useUser();

    const addToGrocery = async () => {
        try {
            const response = await axios.post('http://192.168.8.101:5000/grocery/add', {
                user_id: userData.user_id,
                name: item,
                quantity: '1', 
            });
            Alert.alert('Success', response.data.message); // Display backend message as an alert
            refreshGroceryList();
        } catch (error) {
            console.error('Error adding to grocery:', error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{item}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={addToGrocery}>
                        <Text style={styles.addButtonText}>Add to Grocery</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    title: {
        fontSize: 12,
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SearchTile;
