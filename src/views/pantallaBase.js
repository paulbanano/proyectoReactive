import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';

const pantallaBase = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Numero de Emergencia" 
          onPress={() => navigation.navigate('NroEmergencia')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Contacto" 
          onPress={() => navigation.navigate('contactos')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Hora + Temperatura" 
          onPress={() => navigation.navigate('informacion')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Identificación de cada Aplicación" 
          onPress={() => navigation.navigate('scan')} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6e6fa', // Light lavender background
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
    color: '#b0082', // Indigo text color
  },
  buttonContainer: {
    width: '50%', // Adjusted width
    marginVertical: 15,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    color: '#90ec12', // Green color for buttons
    paddingVertical: 10, // Smaller height
    borderRadius: 5, // Rounded corners for buttons
  },
  buttonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
});

export default pantallaBase;
