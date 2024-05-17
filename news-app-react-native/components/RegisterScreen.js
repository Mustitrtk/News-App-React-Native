import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [telephoneNo, setTelephoneNo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // API axios işlemi
  };

  const handlePress = () => {
    navigation.navigate('Ana Sayfa');
  };

  const handleLoginPress = () =>{
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handlePress}>
          <Text style={styles.headerTitle}>NEWS APP</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <Text style={styles.label}>Surname:</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Surname"
      />
      <Text style={styles.label}>Telephone No:</Text>
      <TextInput
        style={styles.input}
        value={telephoneNo}
        onChangeText={setTelephoneNo}
        placeholder="Telephone No."
        keyboardType="phone-pad"
        maxLength={11}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
        <Button
          title="Login"
          onPress={handleLoginPress}
          color="#007AFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#6200ea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default RegisterScreen;
