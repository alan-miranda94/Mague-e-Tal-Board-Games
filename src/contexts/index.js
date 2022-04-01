import React,{createContext, useReducer} from 'react'
import {memoryGameInitialState, MemoryGameReducer} from '../reducers/memoryGameReducers'
import combineReducers from 'react-combine-reducers'

export const GameContext = createContext()

const  [gameReducer, initialGame] = combineReducers({
  memoryGame:[MemoryGameReducer, memoryGameInitialState]
})

export default ({children}) => {
  const [state, dispatch] = useReducer(gameReducer,initialGame)
 
  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  )
}