import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NroEmergencia from './src/views/NroEmergencia'
import pantallaBase from './src/views/pantallaBase'
import Scan from './src/views/scan'
import informacion from './src/views/informacion'
import contactos from './src/views/contactos'
import about from './src/views/about';

const Stack = createNativeStackNavigator()

function MyStack(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="pantallaBase">
        <Stack.Screen 
          name="pantallaBase"
          component={pantallaBase}
        />  
        <Stack.Screen
          name="NroEmergencia"
          component={NroEmergencia}
        />
        <Stack.Screen 
          name='scan'
          component={Scan}
        />
        <Stack.Screen
          name='informacion'
          component={informacion}
        />
        <Stack.Screen
          name='contactos'
          component={contactos}
        />
        <Stack.Screen
          name='about'
          component={about}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack