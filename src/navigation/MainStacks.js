import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import Splesh from '../screens/Splesh'
import MemoryGame from '../screens/MemoryGame'
import Level from '../screens/MemoryGame/Level'
import TicTacToe from '../screens/TicTacToe'
import SelectPlayer from '../screens/TicTacToe/SelectPlayer'

const Stack = createStackNavigator()

export default () => {
    const config = {
        animation: 'fade',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    }
    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      })
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Splesh' component={Splesh} 
           // options={{ cardStyleInterpolator: forFade }}
             />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='MG-Level' component={Level} />
            <Stack.Screen name='MemoryGame' component={MemoryGame} />
            <Stack.Screen name='TicTacToe' component={TicTacToe} />
            <Stack.Screen name='SelectPlayer' component={SelectPlayer} />

        </Stack.Navigator>

    )
}