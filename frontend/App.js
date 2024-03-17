import { useFonts } from 'expo-font';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { UserProvider } from './contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import {
  Home,
  WeekPlan,
  Profile,
  Login,
  Signup,
  Resources,
  Meals,
  FrontPage,
  LoginScreen
} from './screens/index';
import { StatusBar } from 'expo-status-bar';
import Grocery from './components/Grocery';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const [showGrocery, setShowGrocery] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <StatusBar backgroundColor='#4d8076' style='light' />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="FrontPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FrontPage" component={FrontPage} />
            <Stack.Screen name="Home" component={BottomTabNavigation} />
            <Stack.Screen name="Meals" component={Meals} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Resources" component={Resources} />
            <Stack.Screen name="Grocery" component={Grocery} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
      {showGrocery && <Grocery />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
