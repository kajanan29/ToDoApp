import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';

const HomeScreen = () => {
  const { tasks, addTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a task title.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Input + Button Row */}
      <View style={styles.inputRow}>
        <View style={styles.inputFields}>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            placeholderTextColor="#FF8303"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="About..."
            placeholderTextColor="#FF8303"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Task list or "No tasks" */}
      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
     
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A17',
    padding: 20,
  },
  addButtonText: {
    color: '#1B1A17',
    fontSize: 40,
    fontWeight: 'bold',
  },
  noTasksText: {
    color: '#F0E3CA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputFields: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 8,
    padding: 10,
    color: '#F0E3CA',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FF8303',
    width: 50,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addIcon: {
    width: 22,
    height: 22,
    tintColor: '#1B1A17',
  },
});

export default HomeScreen;
