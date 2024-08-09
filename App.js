// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pantalla1 from './src/use/pantalla1';
import Pantalla2 from './src/use/pantalla2';
import Pantalla3 from './src/use/pantalla3';
import Pantalla4 from './src/use/pantalla4';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="pantalla1">
        <Stack.Screen name="pantalla1" component={Pantalla1} />
        <Stack.Screen name="pantalla2" component={Pantalla2} />
        <Stack.Screen name="pantalla3" component={Pantalla3} />
        <Stack.Screen name="pantalla4" component={Pantalla4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
