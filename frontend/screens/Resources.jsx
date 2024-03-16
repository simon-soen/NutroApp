import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import CartScreen from "../components/cartScreen";
import EducationArticles from "../components/EducationArticles";
import VideoTutorials from "../components/VideoTutorials";
import FeedbackAndSupport from "../components/FeedbackAndSupport";

const Resources = () => {
    return(
        <ScrollView contentContainerStyle={styles.container} style={{marginBottom: 50}}>
            <EducationArticles />
            <View style={styles.separator} />
            {/* Add other components here */}
            <FeedbackAndSupport />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    separator: {
        height: 20,
    },
});

export default Resources;
