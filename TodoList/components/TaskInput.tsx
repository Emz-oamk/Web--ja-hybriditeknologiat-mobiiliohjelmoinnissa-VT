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
            <Button title="Save" onPress={handleAddTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
});