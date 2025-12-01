import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
    onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: Props) {
    const [text, setText] = useState('');

    function handleAddTask() {
        if (text.trim().length === 0) return;
        onAddTask(text);
        setText('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter task"
                value={text}
                onChangeText={setText}
            />
            <Button title="ADD" onPress={handleAddTask} color="#ec407a" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#f8bbd0',
        borderRadius: 10,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginRight: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#f48fb1',
    },
});