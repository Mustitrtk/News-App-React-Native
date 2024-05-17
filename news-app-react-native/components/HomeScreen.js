import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
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
      const response = await fetch('http://10.14.15.119:8080/news/get', { method: 'GET' });
      const data = await response.json();
      setNews(data.result);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePress = () => {
    setIsSidebarVisible(false);
    navigation.navigate('Ana Sayfa');
  };
  const handleLoginPress = () => {
    setIsSidebarVisible(false);
    navigation.navigate('Login');
  };
  const handleRegisterPress = () => {
    setIsSidebarVisible(false);
    navigation.navigate('Register');
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
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>NEWS APP</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleSidebarToggle}>
          <Text style={styles.headerButtonText}>☰</Text>
        </TouchableOpacity>
      </SafeAreaView>
      
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

      <Modal transparent={true} visible={isSidebarVisible} animationType="none">
        <TouchableWithoutFeedback onPress={handleSidebarToggle}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <TouchableOpacity onPress={handlePress} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLoginPress} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegisterPress} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Register</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20, // This ensures the content inside SafeAreaView is not cut off
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButton: {
    padding: 10,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 30,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop:40,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sidebarItemText: {
    fontSize: 18,
    color: '#6200ea',
  },
});

export default HomeScreen;
