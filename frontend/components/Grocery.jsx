import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '@env';

const Grocery = () => {
    const { userData } = useUser();
    const [groceryItems, setGroceryItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const navigation = useNavigation();

    // Function to fetch the grocery list from the backend
    const fetchGroceryList = async () => {
        try {
            const response = await axios.get(`${API_URL}/grocery/${userData.user_id}`);
            setGroceryItems(response.data.grocery_items);
        } catch (error) {
            console.error('Error fetching grocery list:', error);
            Alert.alert('Error', 'Failed to fetch grocery list. Please try again later.');
        }
    };

    // Fetch the grocery list on component mount
    useEffect(() => {
        fetchGroceryList();
    }, [userData]); // Trigger the effect whenever userData changes

    // Function to add a new item to the grocery list
    const addItem = async () => {
        if (newItem.trim() !== '') {
            try {
                const response = await axios.post(`${API_URL}/grocery/add`, {
                    name: newItem,
                    quantity: '',
                    user_id: userData.user_id
                });
                Alert.alert('Success', response.data.message); 
                setNewItem('');
                Alert.alert('Success', response.data.message); 
                fetchGroceryList(); 
            } catch (error) {
                console.error('Error adding item to grocery list:', error);
                Alert.alert('Error', 'Failed to add item to grocery list. Please try again later.');
            }
        }
    };

    const removeItem = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/grocery/${id}`);
            setGroceryItems(groceryItems.filter(item => item.id !== id));
            Alert.alert('Message', response.data.message);
            fetchGroceryList();
        } catch (error) {
            console.error('Error deleting item from grocery list:', error);
            Alert.alert('Error', 'Failed to delete item from grocery list. Please try again later.');
        }
    };

    const handleCartPress = () => {
        navigation.goBack();
    };

    const handleBuyAllPress = async () => {
        try {
            await axios.post(`${API_URL}/grocery/buy-all`, {
                user_id: userData.user_id
            });
            Alert.alert('Success', 'All items purchased successfully.', 'You will be contacted shortly on your delivery process');
            fetchGroceryList(); 
        } catch (error) {
            console.error('Error purchasing items:', error);
            Alert.alert('Success', 'All items purchased successfully.', 'You will be contacted shortly on your delivery process');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCartPress}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Grocery List</Text>
                <TouchableOpacity style={styles.cartContainer} onPress={handleCartPress}>
                    <Ionicons name="cart" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newItem}
                    onChangeText={setNewItem}
                    placeholder="Add new item"
                />
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={groceryItems}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => removeItem(item.id)}>
                            <Text style={styles.deleteButton}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity style={styles.buyAllButton} onPress={handleBuyAllPress}>
                <Text style={styles.buttonText}>Buy All</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    addButton: {
        backgroundColor: '#4d8076',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        paddingHorizontal: 15,
    },
    buyAllButton: {
        backgroundColor: '#4d8076',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,

    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
    },
    deleteButton: {
        color: 'red',
        fontSize: 18,
    },
    cartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Grocery;
