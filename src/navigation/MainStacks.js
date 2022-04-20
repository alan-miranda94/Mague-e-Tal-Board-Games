import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import MemoryGame from '../screens/MemoryGame'
import Level from '../screens/MemoryGame/Level'
const Stack = createStackNavigator()

export default () => (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
            headerShown: false
        }}
    >   
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MG-Level' component={Level} />
        <Stack.Screen name='MemoryGame' component={MemoryGame} />
        

        


    </Stack.Navigator>

)