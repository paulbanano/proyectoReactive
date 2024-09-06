import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, AsyncStorage, Alert } from 'react-native';

export default function NroEmergencia({ navigation }) {
  const [numero, setNumero] = useState('');

  useEffect(() => {
    const obtenerNumero = async () => {
      try {
        const numeroAlmacenado = await AsyncStorage.getItem('nroEmergencia');
        if (numeroAlmacenado !== null) {
          setNumero(numeroAlmacenado);
        }
      } catch (error) {
        console.error('Error al obtener el número de emergencia:', error);
      }
    };
    obtenerNumero();
  }, []);

  const guardarNumero = async () => {
    if (!/^\d{7,15}$/.test(numero)) {
      Alert.alert('Número no válido', 'Por favor ingrese un número de teléfono válido (mínimo 7 dígitos, máximo 15).');
      return;
    }

    try {
      await AsyncStorage.setItem('nroEmergencia', numero);
      Alert.alert('Guardado', 'Número de emergencia guardado correctamente.');
    } catch (error) {
      console.error('Error al guardar el número de emergencia:', error);
    }
  };

  return (
    <View style={styles.container}>
    <Button title="Ir a Contactos" onPress={() => navigation.navigate('contactos')}/>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ingrese el número de emergencia"
        value={numero}
        onChangeText={setNumero}
      />
      <Button title="Guardar número" onPress={guardarNumero} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
  },
});
