// Pantalla1.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Pantalla1({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a Pantalla2"
        onPress={() => navigation.navigate('pantalla2')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
