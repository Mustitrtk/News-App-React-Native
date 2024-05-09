import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://192.168.x.x:8080/news/get',{method:'GET'});
      const data = await response.json();
      setNews(data.result);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const renderNewsItem = ({ item }) => {
    if (!item) {
      return null;
    }

    return (
      <View style={styles.newsItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerButton} onPress={handleLoginPress}>
        <Text style={styles.headerButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
      {news.length > 0 ? (
        <FlatList
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text>No news to display</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#888',
    textAlign: 'center',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  headerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
