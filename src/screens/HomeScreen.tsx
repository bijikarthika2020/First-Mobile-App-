import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import colors from '../constants/colors';

export default function HomeScreen({ navigation, route }: any) {
  const { name } = route.params || { name: 'User' }; // Name passed from login/signup

  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish React Native project', done: false },
    { id: 2, title: 'Read AI/ML article', done: false },
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle task complete
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return;
    const nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id: nextId, title: newTask, done: false }]);
    setNewTask('');
  };

  const completedTasks = tasks.filter(t => t.done).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      { text: 'Logout', onPress: () => navigation.replace('Login') },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#1E1E1E' : colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkMode ? colors.white : colors.text }]}>
          Welcome, {name} 👋
        </Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Progress */}
      <Text style={{ color: darkMode ? colors.gray : colors.text }}>
        Progress: {completedTasks}/{tasks.length} tasks completed
      </Text>

      {/* Task Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { backgroundColor: darkMode ? '#333' : colors.white }]}
          placeholder="Add new task"
          placeholderTextColor={darkMode ? '#aaa' : '#888'}
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={{ color: colors.white }}>ADD</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: item.done ? '#4CAF50' : darkMode ? '#333' : colors.white },
            ]}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={{ color: item.done ? colors.white : darkMode ? colors.white : colors.text }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginTop: 16 }}
      />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { flexDirection: 'row', marginTop: 16 },
  input: { flex: 1, padding: 12, borderRadius: 10, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  addButton: { padding: 12, borderRadius: 10, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  logoutButton: { marginTop: 24, padding: 16, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center' },
  logoutText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
});
