import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const Info = () => {
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
    
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            return Alert.alert('Permiso denegado', 'No se pudo acceder a la ubicación');
          }
        }
        getLocation(); 
      } catch (error) {
        console.error('Error al solicitar permiso de ubicación:', error);
        Alert.alert('Error', 'No se pudo solicitar el permiso de ubicación');
      }
    };
    
    requestLocationPermission();

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getWeather(latitude, longitude);
      },
      error => {
        console.error('Error al obtener ubicación:', error);
        Alert.alert('Error al obtener ubicación', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  

  const getWeather = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${latitude},${longitude}&aqi=no`
      );
      setTemperature(data.current.temp_c);
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      Alert.alert('Error al obtener el clima', 'No se pudo obtener la temperatura actual');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hora actual: {time}</Text>
      {location ? (
        <Text style={styles.text}>
          Ubicación: {location.latitude}, {location.longitude}
        </Text>
      ) : (
        <Text style={styles.text}>Obteniendo ubicación...</Text>
      )}
      {temperature !== null ? (
        <Text style={styles.text}>Temperatura: {temperature}°C</Text>
      ) : (
        <Text style={styles.text}>Obteniendo temperatura...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF9E6',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});

export default Info;
