import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada la librería

const Contacto = () => {
  const [contactos, setContactos] = useState([]);
  const [telefonoEmergencia, setTelefonoEmergencia] = useState('');

  const limpiarNumero = (numero) => {
    let numeroLimpio = numero.replace(/\s|-/g, '');
    const match = numeroLimpio.match(/\d{11}/);
    return match ? match[0] : '';
  };

  useEffect(() => {
    const cargarNumeroEmergencia = async () => {
      try {
        let numeroGuardado = await AsyncStorage.getItem('nroEmergencia');
        if (numeroGuardado) {
          if (!numeroGuardado.startsWith('+549')) {
            numeroGuardado = '+549' + numeroGuardado.replace(/^(\+54 9)/, '');
          } else {
            numeroGuardado = numeroGuardado.replace(/^(\+54 9)/, '+549');
          }
          setTelefonoEmergencia(limpiarNumero(numeroGuardado));
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el número de emergencia');
      }
    };
    cargarNumeroEmergencia();
  }, []);

  useEffect(() => {
    const cargarContactos = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contactosFiltrados = data.filter(contact => 
            contact.name && contact.phoneNumbers && contact.phoneNumbers.length > 0
          );
          setContactos(contactosFiltrados);
        }
      } else {
        Alert.alert('Permiso denegado', 'No se pudo acceder a los contactos');
      }
    };
    cargarContactos();
  }, []);

  const renderContacto = ({ item }) => {
    const numerosLimpios = item.phoneNumbers?.map(phone => limpiarNumero(phone.number));
    const esNumeroEmergencia = numerosLimpios?.some(num => num === telefonoEmergencia);

    return (
      <View style={[styles.contactoContainer, esNumeroEmergencia && styles.emergenciaBackground]}>
        <View style={styles.contactoInfo}>
          <Text style={styles.contactoNombre}>{item.name}</Text>
          {item.phoneNumbers && (
            <Text style={styles.contactoNumero}>
              {item.phoneNumbers[0].number}
            </Text>
          )}
        </View>
        {esNumeroEmergencia && (
          <Ionicons name="ios-warning" size={24} color="red" style={styles.emergenciaIcon} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactos</Text>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        renderItem={renderContacto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactoInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  contactoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactoNumero: {
    fontSize: 16,
    color: '#666',
  },
  emergenciaBackground: {
    backgroundColor: '#FFF3CD', // Color más sutil que el amarillo
  },
  emergenciaIcon: {
    marginLeft: 10,
  },
});

export default Contacto;
