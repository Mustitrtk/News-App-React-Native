import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Sidebar from './Sidebar';

const NewsDetail = ({ route }) => {
  const { id } = route.params;
  const [newsDetail, setNewsDetail] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  const fetchNewsDetail = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:8080/news/get/${id}`, { method: 'GET' });
      const data = await response.json();
      setNewsDetail(data.result);
    } catch (error) {
      console.error('Error fetching news detail:', error);
    }
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isSidebarVisible ? 0 : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSidebarVisible, slideAnim]);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePress = (screen) => {
    setIsSidebarVisible(false);
    navigation.navigate(screen);
  };

  if (!newsDetail) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onToggleSidebar={handleSidebarToggle} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{newsDetail.title}</Text>
        <Text style={styles.subtitle}>{newsDetail.subtitle}</Text>
        <Text style={styles.content}>{newsDetail.content}</Text>
      </ScrollView>
      <Sidebar isVisible={isSidebarVisible} onClose={handleSidebarToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
  },
});

export default NewsDetail;
