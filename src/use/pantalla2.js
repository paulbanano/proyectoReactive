// Pantalla2.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Pantalla2({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a Pantalla3"
        onPress={() => navigation.navigate('pantalla3')}
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
