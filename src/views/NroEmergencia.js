import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Emergencia = () => {
  const [telefono, setTelefono] = useState('');
  const [telefonoGuardado, setTelefonoGuardado] = useState('');

  useEffect(() => {
    const cargarNumeroEmergencia = async () => {
      try {
        const numeroGuardado = await AsyncStorage.getItem('nroEmergencia');
        if (numeroGuardado) {
          setTelefonoGuardado(numeroGuardado);
          setTelefono(numeroGuardado); 
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el número de emergencia');
      }
    };
    cargarNumeroEmergencia();
  }, []);

  // Guardar el número en AsyncStorage
  const guardarNumeroEmergencia = async () => {
    if (validarTelefono(telefono)) {
      try {
        await AsyncStorage.setItem('nroEmergencia', telefono);
        setTelefonoGuardado(telefono);
        Alert.alert('Guardado', 'El número de emergencia ha sido guardado');
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar el número de emergencia');
      }
    } else {
      Alert.alert('Error', 'Por favor, ingresa un número de teléfono válido');
    }
  };

  // Validación del número de teléfono
  const validarTelefono = (numero) => {
    const regexTelefono = /^[0-9]{10}$/;
    return regexTelefono.test(numero);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Nro. Emergencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el número de emergencia"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <Button title="Guardar Número" onPress={guardarNumeroEmergencia} />
      {telefonoGuardado ? (
        <Text style={styles.savedText}>Número guardado: {telefonoGuardado}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  savedText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default Emergencia;
