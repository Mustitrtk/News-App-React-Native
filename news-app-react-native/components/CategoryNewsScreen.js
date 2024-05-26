import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigation } from '@react-navigation/native';

const CategoryNewsScreen = ({ route }) => {
  const { category_id } = route.params;
  const [news, setNews] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNewsByCategory();
  }, [category_id]);

  const fetchNewsByCategory = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:8080/news/getByCategory/${category_id}`, { method: 'GET' });
      const data = await response.json();
      setNews(data.result);
    } catch (error) {
      console.error('Error fetching news by category:', error);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSidebarClose = () => {
    setIsSidebarVisible(false);
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
        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('NewsDetail', { id: item._id })}>
          <Text style={styles.detailButtonText}>Detay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header onToggleSidebar={handleSidebarToggle} />
      
      {news.length > 0 ? (
        <FlatList
          style={styles.flatList}
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text style={styles.noNewsText}>No news to display</Text>
      )}

      <Sidebar isVisible={isSidebarVisible} onClose={handleSidebarClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  detailButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#6200ea',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noNewsText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 18,
  },
});

export default CategoryNewsScreen;