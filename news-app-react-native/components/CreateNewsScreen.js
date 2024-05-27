import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CreateNewsScreen = () => {
  const [type, setType] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isTypePickerVisible, setIsTypePickerVisible] = useState(false);
  const [isCategoryPickerVisible, setIsCategoryPickerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUser();
    fetchCategories();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://10.14.11.145:8080/user/auth/user", { method: "GET" });
      const data = await response.json();
      setAuthorId(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://10.14.11.145:8080/category/get', { method: 'GET' });
      const data = await response.json();
      setCategories(data.result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleNewsSubmit = async () => {
    try {
      const response = await fetch('http://10.14.11.145:8080/news/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          title: title,
          subtitle: subtitle,
          content: content,
          author_id: authorId,
          category_id: category,
        }),
      });
      const data = await response.json();
      if (data.result === "Basarili") {
        navigation.navigate('Ana Sayfa');
      } else {
        console.log("Basarisiz");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header onToggleSidebar={handleSidebarToggle} />
      <Text style={styles.headerText}>Haber/Köşe Yazısı Oluştur</Text>

      <Text style={styles.label}>Type</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsTypePickerVisible(true)}
      >
        <Text style={styles.buttonText}>{type ? 'Köşe Yazısı' : 'Haber'}</Text>
      </TouchableOpacity>
      
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Subtitle</Text>
      <TextInput
        style={styles.input}
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder="Enter subtitle"
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
      />

      <Text style={styles.label}>Category</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsCategoryPickerVisible(true)}
      >
        <Text style={styles.buttonText}>
          {category ? categories.find(cat => cat._id === category)?.name : 'Select Category'}
        </Text>
      </TouchableOpacity>

      <Button title="Oluştur" onPress={handleNewsSubmit} />

      <Sidebar isVisible={isSidebarVisible} onClose={handleSidebarToggle} />

      <Modal
        visible={isTypePickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => {
                setType(itemValue);
                setIsTypePickerVisible(false);
              }}
            >
              <Picker.Item label="Haber" value={false} />
              <Picker.Item label="Köşe Yazısı" value={true} />
            </Picker>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isCategoryPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => {
                setCategory(itemValue);
                setIsCategoryPickerVisible(false);
              }}
            >
              {categories.map(cat => (
                <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  label: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
  },
});

export default CreateNewsScreen;
