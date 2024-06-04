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
  const [category_Name, set_category_name] = useState("");

  useEffect(() => {
    fetchNewsByCategory();
  }, [category_id]);

  const fetchNewsByCategory = async () => {
    try {
      const response = await fetch(`http://10.14.13.54:8080/news/getByCategory/${category_id}`, { method: 'GET' });
      const response_category = await fetch(`http://10.14.13.54:8080/category/get/${category_id}`, { method: 'GET' });
      const data = await response.json();
      const data_category = await response_category.json();
      setNews(data.result);
      set_category_name(data_category.result);
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

    // Extract the author's name and surname
    const authorName = item.author_id.map(author => `${author.name} ${author.surname}`).join(', ');

    return (
      <View style={styles.newsItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.author}>Yazar: {authorName}</Text>
        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('NewsDetail', { id: item._id })}>
          <Text style={styles.detailButtonText}>Detay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header onToggleSidebar={handleSidebarToggle} />
      <Text style={styles.headerText}>{category_Name.name}</Text>
      
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
  author: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CategoryNewsScreen;
