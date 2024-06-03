import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Animated, Dimensions, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Sidebar from './Sidebar';

const NewsDetail = ({ route }) => {
  const { id } = route.params;
  const [newsDetail, setNewsDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [role, setRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    fetchNewsDetail();
    fetchComments();
    checkLoginStatus();
    getAuthUser();
  }, []);

  const fetchNewsDetail = async () => {
    try {
      const response = await fetch(`http://10.14.12.116:8080/news/get/${id}`, { method: 'GET' });
      const data = await response.json();
      setNewsDetail(data.result);
    } catch (error) {
      console.error('Error fetching news detail:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://10.14.12.116:8080/comment/get/${id}`, { method: 'GET' });
      const data = await response.json();
      setComments(Array.isArray(data.result) ? data.result : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`http://10.14.12.116:8080/user/isLogin`, { method: 'GET' });
      const data = await response.json();
      setRole(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthUser = async()=>{
    try {
      const response = await fetch(`http://10.14.12.116:8080/user/auth/user`, { method: 'GET' });
      const data = await response.json();
      setUser(data.result);
    } catch (error) {
      console.log(error);
    }
  }

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

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://10.14.12.116:8080/comment/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: commentText,
          news_id: id,
          author_id: user,
        }),
      });
      if (response.ok) {
        fetchComments();
        setCommentText('');
        
        // Sayfanın yenilenmesi
        navigation.replace('NewsDetail', { id });
      } else {
        console.error('Error submitting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
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
        <Text style={styles.category}>Category: {newsDetail.category_id.map(category => category.name).join(', ')}</Text>
        <Text style={styles.author}>Author: {newsDetail.author_id.map(author => `${author.name} ${author.surname}`).join(', ')}</Text>
        <Text style={styles.commentsTitle}>Yorumlar:</Text>
        {role !== "anonymous" && (
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Yorum yazın..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <Button title="Gönder" onPress={handleCommentSubmit} />
          </View>
        )}
        {comments.length === 0 ? (
          <Text style={styles.noComments}>Henüz Yorum Yok</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment._id} style={styles.comment}>
              <Text style={styles.commentAuthor}>{comment.author_id.user_name}</Text>
              <Text style={styles.commentContent}>{comment.comment}</Text>
            </View>
          ))
        )}
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
  category: {
    fontSize: 14,
    marginTop: 10,
    color: '#888',
  },
  author: {
    fontSize: 14,
    marginTop: 10,
    color: '#888',
  },
  commentsTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  noComments: {
    fontSize: 16,
    color: '#aaa',
  },
  comment: {
    marginBottom: 15,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentContent: {
    fontSize: 14,
    color: '#555',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default NewsDetail;
