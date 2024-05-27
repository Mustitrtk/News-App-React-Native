import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Veri çekme işlemlerini bir fonksiyona alıyoruz
  const fetchNews = async () => {
    try {
      const response = await fetch('http://10.14.11.145:8080/news/get', { method: 'GET' });
      const data = await response.json();
      setNews(data.result);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchCategoryNews = async () => {
    try {
      const response = await fetch('http://10.14.11.145:8080/news/getByCategory/6617d8a662ad98e13aec9661', { method: 'GET' });
      const data = await response.json();
      setCategoryNews(data.result);
    } catch (error) {
      console.error('Error fetching category news:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNews();
      fetchCategoryNews();
    }, [])
  );

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
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

  const renderCategoryNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', { id: item._id })}>
      <View style={[styles.slide, { width }]}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        <Text style={styles.slideContent}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSlider = () => (
    <View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={categoryNews}
        renderItem={renderCategoryNewsItem}
        keyExtractor={item => item._id}
        style={styles.slider}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.indicatorContainer}>
        {categoryNews.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp'
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp'
          });
          return <Animated.View key={index} style={[styles.indicator, { opacity, transform: [{ scale }] }]} />;
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header onToggleSidebar={handleSidebarToggle} />
      <Text style={styles.headerText}>Ana Sayfa</Text>
      
      <FlatList
        ListHeaderComponent={renderSlider}
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={item => item._id}
        style={styles.flatList}
      />

      <Sidebar isVisible={isSidebarVisible} onClose={handleSidebarToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  slider: {
    height: 200,
    marginBottom: 20,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slideSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  slideContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  flatList: {
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
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
});

export default HomeScreen;
