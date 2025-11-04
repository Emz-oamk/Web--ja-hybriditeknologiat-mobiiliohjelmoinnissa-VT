import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');

  const calculateLimits = (enteredAge: string) => {
    if (!enteredAge || isNaN(Number(enteredAge))) {
      setLowerLimit('');
      setUpperLimit('');
      return;
    }

    const ageNum = parseInt(enteredAge);
    const lower = (220 - ageNum) * 0.65;
    const upper = (220 - ageNum) * 0.85;

    setLowerLimit(lower.toFixed(1));
    setUpperLimit(upper.toFixed(1));
  };

  const handleAgeChange = (text: string) => {
    setAge(text);
    calculateLimits(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Zone Calculator</Text>

      <Text style={styles.label}>Enter your age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={handleAgeChange}
        keyboardType="numeric"
        placeholder="e.g. 30"
      />

      <Text style={styles.result}>
        Lower limit: {lowerLimit ? `${lowerLimit} bpm` : '-'}
      </Text>
      <Text style={styles.result}>
        Upper limit: {upperLimit ? `${upperLimit} bpm` : '-'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 120,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginTop: 8,
  },
});