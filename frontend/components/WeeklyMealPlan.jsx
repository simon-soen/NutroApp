import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WeeklyMealPlan = ({ mealPlan }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealTime, setSelectedMealTime] = useState(null);

  useEffect(() => {
    // Reset selectedDay and selectedMealTime when mealPlan changes
    setSelectedDay(null);
    setSelectedMealTime(null);
  }, [mealPlan]);

  console.log('mealPlan:', mealPlan); // Add logging here

  if (!mealPlan || Object.keys(mealPlan).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No meal plan available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mealPlan && Object.keys(mealPlan).map((day, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDay(day)}>
            <View style={[styles.dayItem, selectedDay === day && styles.dayItemSelected]}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView>
        {selectedDay && (
          <View style={styles.mealDetails}>
            <Text style={styles.dayTitle}>{selectedDay}</Text>
            {mealPlan[selectedDay] && Object.keys(mealPlan[selectedDay]).map((mealTime, mealIndex) => (
              <View key={mealIndex} style={styles.mealRow}>
                {mealTime === 'breakfast' && (
                  <Image
                    source={require('../assets/images/breakfast.jpg')}
                    style={styles.mealImage}
                  />
                )}
                {mealTime === 'lunch' && (
                  <Image
                    source={require('../assets/images/lunch.jpg')}
                    style={styles.mealImage}
                  />
                )}
                {mealTime === 'supper' && (
                  <Image
                    source={require('../assets/images/supper.jpg')}
                    style={styles.mealImage}
                  />
                )}
                <View style={styles.mealDetailsContainer}>
                  <Text style={styles.mealTimeText}>{mealTime}</Text>
                  <View style={styles.mealList}>
                    {Array.isArray(mealPlan[selectedDay][mealTime]) ? (
                      mealPlan[selectedDay][mealTime].map((meal, index) => (
                        <Text key={index} style={styles.mealListItem}>
                          - {meal}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.mealListItem}>- {mealPlan[selectedDay][mealTime]}</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dayItem: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff', // White background for days
  },
  dayItemSelected: {
    backgroundColor: '#e0e0e0', // Slightly gray background for selected day
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  mealDetails: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff', // White background for meal details
    borderRadius: 10,
  },
  dayTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  mealDetailsContainer: {
    flex: 1,
  },
  mealTimeText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  mealList: {
    marginTop: 10,
  },
  mealListItem: {
    marginLeft: 20,
    marginBottom: 5,
  },
});

export default WeeklyMealPlan;
