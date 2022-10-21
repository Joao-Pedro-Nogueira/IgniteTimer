import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, finishCycleAction, interruptCurrentCycleAction } from "../reducers/cycles/actions";
import { Cycle, CyclesReducer } from "../reducers/cycles/reducer";


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


export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
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
      
    dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0)
  }

  function updateSecondsPassed(currentDiference: number) {
    setSecondsPassed(currentDiference)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction(activeCycleId))
  }

  function finishCycle() {
    dispatch(finishCycleAction(activeCycleId))
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