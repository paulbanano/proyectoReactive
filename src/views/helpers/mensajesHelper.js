// helpers/mensajesHelper.js
import { Alert, Vibration } from 'react-native';

// Helper para mostrar un error con vibración
export const mostrarErrorConVibracion = (titulo, mensaje) => {
  const duracionVibracion = 500; // Duración de la vibración en milisegundos
  Alert.alert(titulo, mensaje);
  Vibration.vibrate(duracionVibracion);
};
