import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Contactos() {
  const [contactos, setContactos] = useState([]);
  const [nroEmergencia, setNroEmergencia] = useState('');

  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const permiso = await Contacts.requestPermission();
        if (permiso === 'authorized') {
          const contactosTelefono = await Contacts.getAll();
          setContactos(contactosTelefono);
        } else {
          Alert.alert('Permiso denegado', 'Necesitas permitir el acceso a los contactos.');
        }
      } catch (error) {
        console.error('Error al obtener contactos:', error);
      }
    };

    const obtenerNumeroEmergencia = async () => {
      try {
        const numero = await AsyncStorage.getItem('nroEmergencia');
        if (numero !== null) {
          setNroEmergencia(numero);
        }
      } catch (error) {
        console.error('Error al obtener el número de emergencia:', error);
      }
    };
    obtenerContactos();
    obtenerNumeroEmergencia();
  }, []);

  const renderItem = ({ item }) => {
    const esNumeroEmergencia = item.phoneNumbers.some(phone => phone.number === nroEmergencia);
    return (
      <View style={styles.contactoItem}>
        <Text style={styles.nombre}>{item.displayName}</Text>
        {item.phoneNumbers.length > 0 && (
          <Text style={styles.telefono}>{item.phoneNumbers[0].number}</Text>
        )}
        {esNumeroEmergencia && (
          <Icon name="ios-alert" size={24} color="red" style={styles.iconoEmergencia} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.recordID}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay contactos disponibles</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contactoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
  },
  telefono: {
    fontSize: 14,
    color: 'gray',
  },
  iconoEmergencia: {
    marginLeft: 10,
  },
});
