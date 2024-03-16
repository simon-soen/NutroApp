import { View, Text, ScrollView , SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import Search from '../components/Search'
import WeeklyMealPlan from '../components/WeeklyMealPlan'
import WeekPlan from '../components/WeekPlan'
import MealPlan from '../components/MealPlan'

const Meals = () => {
  return (
    console.log('Meals'),
    <ScrollView style={styles.container}>
        <Search />
        <WeekPlan />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
      flexGrow: 1,
      paddingVertical: 20,
  },
});

export default Meals