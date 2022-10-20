import { createContext, ReactNode, useReducer, useState } from "react";

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[],
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  secondsPassed: number,
  finishCycle: () => void,
  updateSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
  children: ReactNode
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state, 
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }
      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle)=> {
            if (cycle.id == state.activeCycleId) {
              return {...cycle, interruptedDate: new Date()}
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }
      case 'FINISH_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle)=> {
            if (cycle.id == state.activeCycleId) {
              return {...cycle, finshedDate: new Date()}
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }
      default:
        return state 
    }
  }, {
    cycles: [],
    activeCycleId: null
  })

  const { cycles, activeCycleId } = cyclesState

  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
      
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload:{
        newCycle
      }
    })
    setSecondsPassed(0)
  }

  function updateSecondsPassed(currentDiference: number) {
    setSecondsPassed(currentDiference)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload:{
        activeCycleId
      }
    })

  }

  function finishCycle() {
    dispatch({
      type: 'FINISH_CYCLE',
      payload:{
        activeCycleId
      }
    })

  }

  return(
    <CyclesContext.Provider 
      value={{
        cycles,
        activeCycle, 
        activeCycleId, 
        finishCycle, 
        updateSecondsPassed, 
        secondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}