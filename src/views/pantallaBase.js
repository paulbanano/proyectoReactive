import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';

const Home = ({ navigation }) => {
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
          title="Scan" 
          onPress={() => navigation.navigate('scan')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Informacion" 
          onPress={() => navigation.navigate('informacion')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Contactos" 
          onPress={() => navigation.navigate('contactos')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="About" 
          onPress={() => navigation.navigate('about')} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});

export default Home;
