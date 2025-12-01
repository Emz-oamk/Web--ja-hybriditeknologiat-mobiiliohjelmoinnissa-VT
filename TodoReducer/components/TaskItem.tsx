import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Task } from "../types/Task";

interface Props {
    task: Task;
    onToggleTask: (id: string) => void;
}

export default function TaskItem({ task, onToggleTask }: Props) {
    return (
        <Pressable onPress={() => onToggleTask(task.id)}>
            <Text style={[styles.text, task.done && styles.doneText]}>
            {task.text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f48fb1'
    },
    doneText: {
        textDecorationLine: "line-through",
        color: "#888",
        backgroundColor: '#f1cgd9',
    },
});