import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import axios from 'axios';

const CartScreen = () => {
    const { userData } = useUser();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://192.168.8.101:5000/cart/${userData.user_id}`);
                
                setCartItems(response.data.cart_items);
                console.log(cartItems)
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        if (userData) {
            fetchCartItems();
        }
    }, [userData]);

    const renderItem = ({ item }) => {
        // Extract meal names using regular expression
        const mealNamePattern = /"(.*?)"/g;
        const mealNames = item.meal_name.match(mealNamePattern);
    
        // Map each meal name to a Text component
        const mealNameElements = mealNames.map((meal, index) => (
            <Text key={index} style={styles.mealName}>{meal.replace(/"/g, '')}</Text>
        ));
    
        return (
            <View style={styles.item}>
                <Text style={styles.mealTime}>{item.meal_time}</Text>
                {mealNameElements}
            </View>
        );
    };
    
    

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    mealTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mealName: {
        fontSize: 14,
    },
});

export default CartScreen;
