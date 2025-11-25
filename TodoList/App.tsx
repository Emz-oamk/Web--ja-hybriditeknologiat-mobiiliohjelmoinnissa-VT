import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { Task } from './Task';

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
      try {
        const tasksJson = await AsyncStorage.getItem('@tasks');
        if (tasksJson) {
          setTasks(JSON.parse(tasksJson));
        }
      } catch (e) {
        console.error('Failed to load tasks.', e);
      }
    }

    async function saveTasks(newTasks: Task[]) {
      try {
        await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
      } catch (e) {
        console.error('Failed to save tasks.', e);
      }
    }

    function addTask(text: string) {
        const newTask: Task = {
            id: Date.now().toString(),
            text,
            done: false,
        };
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
        saveTasks(newTasks);
    }
    
    function toggleTask(id: string) {
        const newTasks = tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        );
        setTasks(newTasks);
        saveTasks(newTasks);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <TaskInput onAddTask={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} onToggleTask={toggleTask} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
});