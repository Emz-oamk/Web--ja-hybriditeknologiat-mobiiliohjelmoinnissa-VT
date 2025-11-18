import { useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SecondScreen'>;

export default function SecondScreen({ navigation,route }: Props) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'pink' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Second Screen!</Text>
            <Text style={styles.text}>{route.params.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

