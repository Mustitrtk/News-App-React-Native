import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsDetail = ({ route }) => {
  const { id } = route.params;
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  const fetchNewsDetail = async () => {
    try {
      const response = await fetch(`http://10.14.x.x:8080/news/get/${id}`, { method: 'GET' });
      const data = await response.json();
      setNewsDetail(data.result);
    } catch (error) {
      console.error('Error fetching news detail:', error);
    }
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
      <Text style={styles.title}>{newsDetail.title}</Text>
      <Text style={styles.subtitle}>{newsDetail.subtitle}</Text>
      <Text style={styles.content}>{newsDetail.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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
});

export default NewsDetail;
