import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, Linking, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const EducationArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything?q=nutrition&sortBy=publishedAt&apiKey=5de6b97bec234d2caa39e42f550d4b15');
                const randomArticles = response.data.articles.sort(() => 0.5 - Math.random()).slice(0, 10); // Randomly select 10 articles
                setArticles(randomArticles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const openArticleLink = (url) => {
        Linking.openURL(url);
    };

    const renderArticleItem = ({ item }) => (
        <View style={styles.articleContainer}>
            <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
            <ScrollView style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleDescription}>{item.description}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => openArticleLink(item.url)} style={styles.readArticleButton}>
                <Text style={styles.readArticleButtonText}>Read Article</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Top Articles Today</Text>
            <FlatList
                horizontal
                data={articles}
                renderItem={renderArticleItem}
                keyExtractor={(item) => item.url}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    articleContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
        width: 300,
        height: 350,
        justifyContent: 'space-between',
    },
    articleImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    articleContent: {
        flex: 1,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    articleDescription: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 10,
    },
    readArticleButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    readArticleButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default EducationArticles;
