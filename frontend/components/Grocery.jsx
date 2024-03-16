import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const Grocery = () => {
    const { userData } = useUser();
    const [groceryItems, setGroceryItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    // Function to fetch the grocery list from the backend
    const fetchGroceryList = async () => {
        try {
            const response = await axios.get(`http://192.168.8.101:5000/grocery/${userData.user_id}`);
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
                const response = await axios.post('http://192.168.8.101:5000/grocery/add', {
                    name: newItem,
                    quantity: '',
                    user_id: userData.user_id
                });
                Alert.alert('Success', response.data.message); 
                setNewItem('');
                fetchGroceryList(); // Refresh the grocery list after adding an item
            } catch (error) {
                console.error('Error adding item to grocery list:', error);
                Alert.alert('Error', 'Failed to add item to grocery list. Please try again later.');
            }
        }
    };

    // Function to delete an item from the grocery list
    const removeItem = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.8.101:5000/grocery/${id}`);
            setGroceryItems(groceryItems.filter(item => item.id !== id));
            Alert.alert('Message', response.data.message);
            fetchGroceryList();
        } catch (error) {
            console.error('Error deleting item from grocery list:', error);
            Alert.alert('Error', 'Failed to delete item from grocery list. Please try again later.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Grocery List</Text>
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
                            <Text style={styles.deleteButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
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
});

export default Grocery;
