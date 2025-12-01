import { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';

type Action =
    | { type: 'LOAD_TASKS'; tasks: Task[] }
    | { type: 'ADD_TASK'; text: string }
    | { type: 'TOGGLE_TASK'; id: string };

function todoReducer(state: Task[], action: Action): Task[] {
    switch (action.type) {
        case 'LOAD_TASKS':
            return action.tasks;
        
        case 'ADD_TASK': {
            const addNewTask: Task = {
                id: Date.now().toString(),
                text: action.text,
                done: false,
            };
            return [addNewTask, ...state];
        }

        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.id ? { ...task, done: !task.done } : task
            );
        
        default:
            return state;
    }
}

// App:sta siirretty ja muokattu
export function useTodos() {
    const [tasks, dispatch] = useReducer(todoReducer, [] as Task[]);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            const json = await AsyncStorage.getItem('@tasks');
            if (json) {
                const parsed = JSON.parse(json) as Task[] | null;
                if (parsed && Array.isArray(parsed)) {
                    dispatch({ type: 'LOAD_TASKS', tasks: JSON.parse(json) });
                }
            }
        }
        catch (e) {
            console.error('Failed to load tasks.', e);
        }
    }

    async function saveTasks(updated: Task[]) {
        try {
            await AsyncStorage.setItem('@tasks', JSON.stringify(updated));
        }
        catch (e) {
            console.error('Failed to save tasks.', e);
        }
    }

    useEffect(() => {
        if (tasks.length > 0) saveTasks(tasks);
    }, [tasks]);

    const addTask = (text: string) => dispatch({ type: 'ADD_TASK', text });
    const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', id });

    return { tasks, addTask, toggleTask };
}





