import React from "react";
import Welcome from "../components/Welcome";
import MealPlan from "../components/MealPlan";
import Search from "../components/Search";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import Grocery from "../components/Grocery";

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[{ key: 'Welcome' }, { key: 'MealPlan' }, { key: 'Grocery' }]}
                renderItem={({ item }) => {
                    switch (item.key) {
                        case 'Welcome':
                            return <Welcome />;
                        case 'MealPlan':
                            return <MealPlan />;
                        case 'Grocery':
                            return <Grocery />;
                        default:
                            return null;
                    }
                }}
                keyExtractor={item => item.key}
                contentContainerStyle={styles.scrollContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
    },
    scrollContent: {
        paddingVertical: 20,
    },
});

export default Home;
