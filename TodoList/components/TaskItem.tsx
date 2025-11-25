import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Task } from "../Task";

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
        paddingVertical: 8,
    },
    doneText: {
        textDecorationLine: "line-through",
        color: "#777",
    },
});