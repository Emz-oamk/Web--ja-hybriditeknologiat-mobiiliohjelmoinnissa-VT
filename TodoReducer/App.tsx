import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { useTodos } from './hooks/useTodos'

export default function App() {
    const { tasks, addTask, toggleTask } = useTodos();

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
        backgroundColor: '#fce4ec'
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
        paddingVertical: 12,
        color: 'white',
        backgroundColor: '#ec407a',
        borderRadius: 8,
    },
});