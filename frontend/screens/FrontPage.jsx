import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../constants";

const FrontPage = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                    <View style={styles.FrontImg}> 
                        <Image
                            source={require("../assets/images/mali2bg.png")}
                            style={{ width: "100%", height:"100%", resizeMode: 'cover' }}
                        />
                    </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.heading}>Empowering Health through</Text>
                    <Text style={[styles.heading, {marginTop:-10}]}>Customized Meals</Text>
                    <Text style={styles.description}>
                        Welcome to our meal plan web app, tailored specificaly for individuals managing non communicable diseases.
                        Let's embark on this journey together towards a healthier, happier you! 
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={{color: "white", fontSize: 20, fontFamily: "bold"}}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FrontPage;

const styles = StyleSheet.create({
    FrontImg:{
        height:SIZES.height * 0.6,
        width: SIZES.width,
        resizeMode: 'cover',
        backgroundColor: "#4d8076",
    },
    contentContainer:{
        width: SIZES.width*0.90,
        marginHorizontal: SIZES.width*0.05,
        marginTop: 40,

    },
    heading: {
        fontSize: 26,
        fontFamily: 'bold',
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
        fontFamily: "regular",
    },
    btnContainer:{
        alignItems: "center",
        marginTop: 40,
        width: SIZES.width*0.7,
        backgroundColor: "#4d8076",
        marginHorizontal: SIZES.width*0.15,

    },
    btn:{
        padding: 15,
    }
})