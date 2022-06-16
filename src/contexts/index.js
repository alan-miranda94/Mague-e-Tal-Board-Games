import React,{createContext, useReducer} from 'react'
import {memoryGameInitialState, MemoryGameReducer} from '../reducers/memoryGameReducers'
import { tictactoeInitialState, TictactoeReducer } from '../reducers/tictactoeReducers'
import combineReducers from 'react-combine-reducers'


export const GameContext = createContext()

const  [gameReducer, initialGame] = combineReducers({
  memoryGame:[MemoryGameReducer, memoryGameInitialState],
  tictactoe:[TictactoeReducer, tictactoeInitialState]
})

export default ({children}) => {
  const [state, dispatch] = useReducer(MemoryGameReducer, memoryGameInitialState)//(gameReducer,initialGame)
 
  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  )
}