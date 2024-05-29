import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();

  const [role, setRole] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`http://172.20.10.2:8080/user/isLogin`, { method: 'GET' });
        const data = await response.json();
        setRole(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      checkLoginStatus();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      // Add cleanup logic if needed
    };
  }, [isVisible]);

  const handlePress = (screen, params) => {
    onClose();
    navigation.navigate(screen, params);
  };

  const handleLogout = async()=>{
    try {
      const response = await fetch(`http://172.20.10.2:8080/user/logout`, { method: 'GET' });
      const data = await response.json();
      if(data.result=="Basarili"){
        navigation.navigate("Login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <TouchableOpacity onPress={() => handlePress('Ana Sayfa')} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Ana Sayfa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('CategoryNews', { category_id: "6617d8a662ad98e13aec9661" })} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Son Dakika</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('CategoryNews', { category_id: "6617d89e62ad98e13aec965f" })} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Spor</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('CategoryNews', { category_id: "6617d8ad62ad98e13aec9663" })} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Magazin</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('TypeNews', { type: "0" })} style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Köşe Yazısı</Text>
              </TouchableOpacity>
              {role === "yazar" || role ==="arastirmaci" && (
                <>
                  <TouchableOpacity onPress={() => handlePress('CreateNews')} style={styles.sidebarItem}>
                    <Text style={styles.sidebarItemText}>Haber Oluştur</Text>
                  </TouchableOpacity>
                </>
              )}
              {role !== "anonymous"&& (
                <>
                  <TouchableOpacity onPress={() => handleLogout()} style={styles.sidebarItem}>
                    <Text style={styles.sidebarItemText}>Çıkış</Text>
                  </TouchableOpacity>
                </>
              )}
              {role === "anonymous" && (
                <>
                  <TouchableOpacity onPress={() => handlePress('Login')} style={styles.sidebarItem}>
                    <Text style={styles.sidebarItemText}>Giriş</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress('Register')} style={styles.sidebarItem}>
                    <Text style={styles.sidebarItemText}>Kayıt</Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
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

export default Sidebar;
