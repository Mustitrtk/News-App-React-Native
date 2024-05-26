// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Header = ({ onToggleSidebar }) => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerTitle}>NEWS APP</Text>
      <TouchableOpacity style={styles.headerButton} onPress={onToggleSidebar}>
        <Text style={styles.headerButtonText}>☰</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
