import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';

const Contactos = () => {
  const [listaContactos, setListaContactos] = useState([]);
  const [nroEmergencia, setNroEmergencia] = useState('');

  const normalizarNumero = (numero) => {
    let limpio = numero.replace(/\s|-/g, '');
    const match = limpio.match(/\d{11}/);
    return match ? match[0] : '';
  };

  useEffect(() => {
    const obtenerNroEmergencia = async () => {
      try {
        let numero = await AsyncStorage.getItem('nroEmergencia');
        if (!numero) return; // Si no hay número guardado, no es necesario continuar
        numero = numero.startsWith('+549') ? numero : '+549' + numero;
        setNroEmergencia(normalizarNumero(numero));
      } catch (error) {
        console.error('Error al cargar el número de emergencia:', error);
        Alert.alert('Error', 'No se pudo cargar el número de emergencia');
      }
    };
    
    obtenerNroEmergencia();
  }, []);

  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
          return Alert.alert('Permiso denegado', 'Acceso a los contactos denegado');
        }

        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
    
        if (data.length === 0) {
          return Alert.alert('No hay contactos', 'No se encontraron contactos en el teléfono');
        }
    
        const contactosValidos = data.filter(c => c.name && c.phoneNumbers?.length > 0);
        setListaContactos(contactosValidos);
      } catch (error) {
        console.error('Error al obtener contactos:', error);
        Alert.alert('Error', 'No se pudo obtener la lista de contactos');
      }
    };
    
    obtenerContactos();
  }, []);

const renderContacto = ({ item }) => {
  const { name, phoneNumbers } = item;
  const numeros = phoneNumbers?.map(phone => normalizarNumero(phone.number));
  const esEmergencia = numeros?.includes(nroEmergencia);

  return (
    <View style={[styles.itemContacto, esEmergencia && styles.contactoEmergencia]}>
      <View style={styles.detalleContacto}>
        <Text style={styles.nombre}>{name}</Text>
        <Text style={styles.numero}>{phoneNumbers[0]?.number}</Text>
      </View>
    </View>
  );
};


  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Lista de Contactos</Text>
      <FlatList
        data={listaContactos}
        keyExtractor={(item) => item.id}
        renderItem={renderContacto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContacto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detalleContacto: {
    flexDirection: 'column',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  numero: {
    fontSize: 16,
    color: '#666',
  },
  contactoEmergencia: {
    backgroundColor: 'yellow',
  },
});

export default Contactos;
