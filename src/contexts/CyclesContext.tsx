import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
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
  }, () => {
    const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (!!storageStateAsJSON) {
      return JSON.parse(storageStateAsJSON)
    }
  })

  const { cycles, activeCycleId } = cyclesState

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

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
  
  const [secondsPassed, setSecondsPassed] = useState(() => {

    if(activeCycle) {
      const currentDiference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      return (currentDiference)
    } else {
      return (0)
    }
    
  })

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