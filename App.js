import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Emergencia from './src/views/emergencia'
import Home from './src/views/home'
import Scan from './src/views/scan'
import Info from './src/views/info'
import Contacto from './src/views/contactos'
import About from './src/views/about';

const Stack = createNativeStackNavigator()

function MyStack(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={Home}
        />  
        <Stack.Screen
          name="emergencia"
          component={Emergencia}
        />
        <Stack.Screen 
          name='scan'
          component={Scan}
        />
        <Stack.Screen
          name='info'
          component={Info}
        />
        <Stack.Screen
          name='contacto'
          component={Contacto}
        />
        <Stack.Screen
          name='about'
          component={About}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack