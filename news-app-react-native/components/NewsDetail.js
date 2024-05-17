import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
      const response = await fetch(`http://10.14.15.119:8080/news/get/${id}`, { method: 'GET' });
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

  const handlePress = () => {
    setIsSidebarVisible(false);
    navigation.navigate('Ana Sayfa');
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
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>NEWS APP</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleSidebarToggle}>
          <Text style={styles.headerButtonText}>☰</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text style={styles.title}>{newsDetail.title}</Text>
      <Text style={styles.subtitle}>{newsDetail.subtitle}</Text>
      <Text style={styles.content}>{newsDetail.content}</Text>

      <Modal transparent={true} visible={isSidebarVisible} animationType="none">
        <TouchableWithoutFeedback onPress={handleSidebarToggle}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <TouchableOpacity onPress={handlePress} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Home</Text>
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

export default NewsDetail;
