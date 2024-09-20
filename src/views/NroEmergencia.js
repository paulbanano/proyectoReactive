import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mostrarErrorConVibracion } from './helpers/mensajesHelper'; // Importamos el helper

const Emergencia = () => {
  const [telefono, setTelefono] = useState('');
  const [telefonoGuardado, setTelefonoGuardado] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarNumeroEmergencia = async () => {
      try {
        const numeroGuardado = await AsyncStorage.getItem('nroEmergencia');
        if (numeroGuardado) {
          setTelefonoGuardado(numeroGuardado);
          setTelefono(numeroGuardado); 
        }
      } catch (error) {
        mostrarErrorConVibracion('Error', 'No se pudo cargar el número de emergencia');
      }
    };
    cargarNumeroEmergencia();
  }, []);

  const guardarNumeroEmergencia = async () => {
    if (validarTelefono(telefono)) {
      try {
        await AsyncStorage.setItem('nroEmergencia', telefono);
        setTelefonoGuardado(telefono);
        setError('');
        mostrarErrorConVibracion('Guardado', 'El número de emergencia ha sido guardado');
      } catch (error) {
        mostrarErrorConVibracion('Error', 'No se pudo guardar el número de emergencia');
      }
    } else {
      setError('Por favor, ingresa un número de teléfono válido (10 dígitos)');
      mostrarErrorConVibracion('Error', 'Número de teléfono inválido, debe tener 10 dígitos');
    }
  };

  const validarTelefono = (numero) => {
    const regexTelefono = /^[0-9]{10}$/; // Valida un número de teléfono con 10 dígitos
    return regexTelefono.test(numero);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Nro. Emergencia</Text>
      
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Ingresa el número de emergencia"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={(value) => { setTelefono(value); setError(''); }} // Resetea el error al escribir
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  savedText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default Emergencia;
