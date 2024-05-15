import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isSidebarVisible ? 0 : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSidebarVisible, slideAnim]);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://10.14.x.x:8080/news/get', { method: 'GET' });
      const data = await response.json();
      setNews(data.result);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLoginPress = () => {
    setIsSidebarVisible(false);
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
        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('NewsDetail', { id: item._id })}>
        <Text style={styles.detailButtonText}>Detay</Text>
      </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerButton} onPress={handleSidebarToggle}>
        <Text style={styles.headerButtonText}>☰</Text>
      </TouchableOpacity>
      {news.length > 0 ? (
        <FlatList
          style={styles.FlatList}
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text>No news to display</Text>
      )}
      <Modal transparent={true} visible={isSidebarVisible} animationType="none">
        <TouchableWithoutFeedback onPress={handleSidebarToggle}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <TouchableOpacity onPress={handleLoginPress} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    textAlign: 'center',
  },
  FlatList:{
    top: 50,
  },
  headerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 30,
  },

  //Detay style
  detailButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignContent:"flex-end"
  },
  detailButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign:"right",
  },

  //Modal ve sidebar style
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  sidebarItem: {
    top:20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sidebarItemText: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default HomeScreen;
