// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NroEmergencia from './src/use/Nro.Emergencia';
import contactos from './src/use/contactos';
import Pantalla3 from './src/use/pantalla3';
import Pantalla4 from './src/use/pantalla4';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nro.Emergencia">
        <Stack.Screen name="Nro.Emergencia" component={NroEmergencia} />
        <Stack.Screen name="contactos" component={contactos} />
        <Stack.Screen name="pantalla3" component={Pantalla3} />
        <Stack.Screen name="pantalla4" component={Pantalla4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

