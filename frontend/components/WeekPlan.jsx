import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { useUser } from '../contexts/UserContext';
import WeeklyMealPlan from './WeeklyMealPlan';
import { API_URL } from '@env';

const WeekPlan = () => {
  const { userData } = useUser();
  const [mealPlan, setMealPlan] = useState(null);

  const generateMealPlan = async () => {
    try {
      const response = await fetch(`${API_URL}/weekly_meal_plan/${userData.user_id}`);
      if (response.ok) {
        const data = await response.json();
        setMealPlan(data);
      } else {
        throw new Error('Failed to fetch weekly meal plan');
      }
    } catch (error) {
      console.error('Error generating weekly meal plan:', error);
      Alert.alert('Error', 'Failed to generate weekly meal plan. Please try again later.');
    }
  };

  const regenerateMealPlan = async () => {
    try {
      const response = await fetch(`${API_URL}/weekly_meal_plan/${userData.user_id}`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        const data = await response.json();
        setMealPlan(data);
        generateMealPlan();
        Alert.alert('Success', data.message);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error regenerating weekly meal plan:', error);
      Alert.alert('Error', 'Failed to regenerate weekly meal plan. Please try again later.');
    }
  };

  useEffect(() => {
    if (userData && !mealPlan) {
      generateMealPlan();
    }
  }, [userData, mealPlan]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <Button title="Generate Weekly Meal Plan" onPress={generateMealPlan} />
      </View>
      {mealPlan && <WeeklyMealPlan mealPlan={mealPlan} />}
      <Button title="Regenerate Weekly Meal Plan" onPress={regenerateMealPlan} />
    </View>
  );
};

export default WeekPlan;
