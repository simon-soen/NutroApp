import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Video } from 'expo-av';

const VideoTutorials = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Nutritious Food Choices Video Tutorials</Text>
            <Video
                source={{ uri: 'https://www.youtube.com/watch?v=MWk8XJWEiO4&pp=ygUDbmNk' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.video}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: 200,
    },
});

export default VideoTutorials;
