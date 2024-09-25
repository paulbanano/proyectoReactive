import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Emergencia" 
          onPress={() => navigation.navigate('emergencia')} 
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
          title="Info" 
          onPress={() => navigation.navigate('info')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Contacto" 
          onPress={() => navigation.navigate('contacto')} 
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
