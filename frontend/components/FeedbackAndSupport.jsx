import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, TextInput, Alert } from "react-native";

const FeedbackAndSupport = () => {
    const [message, setMessage] = useState("");

    // Function to handle sending feedback
    const handleSendFeedback = () => {
        if (message.trim() === "") {
            Alert.alert("Error", "Please enter your feedback");
            return;
        }

        // Here, you can implement logic to send the feedback
        // For example, you can send an email with the feedback
        // Or you can submit the feedback through an API

        // After handling the feedback, clear the message
        setMessage("");
        Alert.alert("Success", "Feedback sent successfully");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Feedback</Text>
            <Text style={styles.text}>
                We value your feedback! Let us know what you think about our resources and suggest topics or content you would like to see in future updates.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your feedback here"
                multiline
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 120,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

export default FeedbackAndSupport;
