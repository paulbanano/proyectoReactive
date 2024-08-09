// Pantalla4.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Pantalla4({ route }) {
  const { text } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Texto recibido: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
