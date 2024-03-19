import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, ImageBackground, View, TouchableOpacity, Button, Alert, ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { API_URL } from '@env';

const MealPlan = () => {
    const { userData, refreshGroceryList, groceryItems } = useUser(); // Assuming groceryItems is retrieved from the context
    const [mealPlan, setMealPlan] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        const fetchMealPlan = async () => {
            if (userData) {
                setLoading(true); // Set loading to true when fetching starts
                try {
                    const response = await fetch(`${API_URL}/weekly_meal_plan/${userData.user_id}`, { mode: 'cors' });
                    const data = await response.json();
                    const currentDate = new Date().toISOString().split('T')[0];
                    const todaysMealPlan = data[currentDate];
                    setMealPlan(todaysMealPlan);
                    setError(null); // Reset error if fetching is successful
                } catch (error) {
                    setMealPlan(null);
                    setError('User data is required to fetch the meal plan. Please log in.');
                    console.error('Error fetching meal plan:', error);
                } finally {
                    setLoading(false); // Set loading to false when fetching ends (either success or error)
                }
            }
        };

        fetchMealPlan();
    }, [userData, mealPlan]);

    const addToGrocery = async (mealTime) => {
        const meals = mealPlan[mealTime];
        try {
            for (const meal of meals) {
                const existingItem = groceryItems.find(item => item.name === meal);
                if (existingItem) {
                    continue;
                }
    
                const response = await axios.post(`${API_URL}/grocery/add`, {
                    user_id: userData.user_id,
                    name: meal,
                    quantity: '1', 
                });
                Alert.alert('Success', response.data.message); 
                refreshGroceryList();
            }
        } catch (error) {
            console.error('Error adding to grocery:', error);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Today's Meal Plan</Text>
            {loading ? ( // Show loading indicator if loading is true
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
                    {mealPlan && Object.keys(mealPlan).map((mealTime, mealIndex) => (
                        <TouchableOpacity key={mealIndex} style={styles.mealItem}>
                            <ImageBackground
                                source={
                                    mealTime === 'breakfast' ? require('../assets/images/breakfast.jpg') :
                                        mealTime === 'lunch' ? require('../assets/images/lunch.jpg') :
                                            require('../assets/images/supper.jpg')
                                }
                                style={styles.mealBackground}
                                imageStyle={styles.mealImage}
                            >
                                <Text style={styles.mealTimeText}>{mealTime}</Text>
                            </ImageBackground>
                            <View style={styles.mealContent}>
                                {Array.isArray(mealPlan[mealTime]) ? (
                                    mealPlan[mealTime].map((meal, index) => (
                                        <Text key={index} style={styles.mealText}>- {meal}</Text>
                                    ))
                                ) : (
                                    <Text style={styles.mealText}>- {mealPlan[mealTime]}</Text>
                                )}
                                <Button title="Add to Grocery" onPress={() => addToGrocery(mealTime)} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    mealItem: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
    mealBackground: {
        width: 200,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mealImage: {
        borderRadius: 10,
    },
    mealTimeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        alignSelf: 'center',
        marginTop: 20,
    },
    mealContent: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: 200,
        height:400,
        justifyContent: 'space-between',
    },
    mealText: {
        fontSize: 16,
        marginBottom: 5,
        flex: 1,
    },
});

export default MealPlan;
