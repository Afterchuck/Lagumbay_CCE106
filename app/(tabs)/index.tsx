import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function App() {
  const studentInfo = {
    name: "Johnrie Lagumbay",
    program: "BS Information Technology"
  };


  const [tasks, setTasks] = useState([
    { id: '1', title: 'Submit React Native Lab 1', dueDate: '2026-11-05', completed: false },
    { id: '2', title: 'Study for Data Structures Exam', dueDate: '2026-11-08', completed: true },
  ]);
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;


  const handleAddTask = () => {
    if (!titleInput.trim() || !dateInput.trim()) {
      Alert.alert('Validation Error', 'Please provide both a task title and a due date.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: titleInput.trim(),
      dueDate: dateInput.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitleInput(''); 
    setDateInput('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity 
        style={styles.taskTextContainer} 
        onPress={() => toggleTaskCompletion(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.taskTitle, item.completed && styles.completedText]}>
          {item.completed ? '😒 ' : '😑 '} {item.title}
        </Text>
        <Text style={styles.taskDate}>Due: {item.dueDate}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => handleDeleteTask(item.id)}
        activeOpacity={0.6}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerBanner}>
        <Text style={styles.studentName}>{studentInfo.name}</Text>
        <Text style={styles.studentProgram}>{studentInfo.program}</Text>
        <Text style={styles.appTitle}>Task Manager</Text>
      </View>

      <View style={styles.counterRow}>
        <View style={[styles.counterBox, styles.pendingBox]}>
          <Text style={styles.icon}>😒</Text>
          <Text style={styles.counterNumber}>{pendingCount}</Text>
          <Text style={styles.counterLabel}>Pending</Text>
        </View>
        <View style={[styles.counterBox, styles.completedBox]}>
          <Text style={styles.icon}>😂</Text>
          <Text style={styles.counterNumber}>{completedCount}</Text>
          <Text style={styles.counterLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title (e.g., Code UI)"
          value={titleInput}
          onChangeText={setTitleInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (e.g., YYYY-MM-DD)"
          value={dateInput}
          onChangeText={setDateInput}
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add New Task</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.labelTaskList}>My Task List</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found. Add one above!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerBanner: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 15,
  },
  studentName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  studentProgram: {
    color: '#E0EFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  appTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.8,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  counterBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pendingBox: {
    backgroundColor: '#FFEBEA',
  },
  completedBox: {
    backgroundColor: '#E6F4EA',
  },
  counterNumber: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  counterLabel: {
    fontSize: 12,
    color: '#555',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  addButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 14,
  },
  labelTaskList: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#000',
    fontWeight: 'bold',
  }
});