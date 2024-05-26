import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
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
      const response = await fetch(`http://192.168.1.87:8080/news/get/${id}`, { method: 'GET' });
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onToggleSidebar={handleSidebarToggle} />
      <Text style={styles.title}>{newsDetail.title}</Text>
      <Text style={styles.subtitle}>{newsDetail.subtitle}</Text>
      <Text style={styles.content}>{newsDetail.content}</Text>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#888',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
});

export default NewsDetail;
