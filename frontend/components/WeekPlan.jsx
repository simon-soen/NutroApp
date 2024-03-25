import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useUser } from '../contexts/UserContext';
import WeeklyMealPlan from './WeeklyMealPlan';
import { API_URL } from '@env';

const WeekPlan = () => {
  const { userData } = useUser();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchMealPlan = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(`${API_URL}/weekly_meal_plan/${userData.user_id}`);
      if (response.ok) {
        const data = await response.json();
        setMealPlan(data);
      } else if (response.status === 404) {
        // If meal plan not found, trigger generation
        generateMealPlan();
      } else {
        throw new Error('Failed to fetch weekly meal plan');
      }
    } catch (error) {
      console.error('Error fetching weekly meal plan:', error);
      Alert.alert('Error', 'Failed to fetch weekly meal plan. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when fetching ends (either success or error)
    }
  };

  const generateMealPlan = async () => {
    setLoading(true); // Set loading to true when generating starts
    try {
      const response = await fetch(`${API_URL}/weekly_meal_plan/${userData.user_id}`, {
        method: 'POST',
      });
      if (response.ok) {
        // If generation successful, fetch the meal plan again
        fetchMealPlan();
      } else {
        throw new Error('Failed to generate weekly meal plan');
      }
    } catch (error) {
      console.error('Error generating weekly meal plan:', error);
      Alert.alert('Error', 'Failed to generate weekly meal plan. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when generation ends (either success or error)
    }
  };

  const regenerateMealPlan = async () => {
    setLoading(true); // Set loading to true when regenerating starts
    try {
      const response = await fetch(`${API_URL}/weekly_meal_plan/${userData.user_id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        Alert.alert('Success', 'Weekly meal plan regenerated successfully.');
        fetchMealPlan(); // Refresh meal plan after regeneration
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error regenerating weekly meal plan:', error);
      Alert.alert('Error', 'Failed to regenerate weekly meal plan. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when regenerating ends (either success or error)
    }
  };

  useEffect(() => {
    if (userData) {
      fetchMealPlan();
    }
  }, [userData]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <Text style={{color:"#000", fontSize: 24}}>Weekly Meal Plan</Text>
      </View>
      {loading ? ( // Show loading indicator if loading is true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : mealPlan ? ( // Render meal plan if available
        <WeeklyMealPlan mealPlan={mealPlan} />
      ) : (
        <Button title="Generate Weekly Meal Plan" onPress={generateMealPlan} />
      )}
  
      <TouchableOpacity style={{backgroundColor: "#4d8076", padding:10, borderRadius:5 }} onPress={regenerateMealPlan} >
          <Text style={{color:"#fff"}}>Regenerate Weekly Meal Plan</Text>
         </TouchableOpacity>
    </View>
  );
};

export default WeekPlan;
