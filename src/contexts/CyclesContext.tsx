import { createContext, ReactNode, useState } from "react";

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
  
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState <string|null>(null)
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
      
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsPassed(0)
    // reset()
  }

  function updateSecondsPassed(currentDiference: number) {
    setSecondsPassed(currentDiference)
  }

  function interruptCurrentCycle() {
    setCycles((state)=>
      state.map((cycle)=> {
          if (cycle.id == activeCycleId) {
            return {...cycle, interruptedDate: new Date()}
          } else {
            return cycle
          }
        }
      )
    ),
    
    setActiveCycleId(null)
  }

  function finishCycle() {
    setCycles(
      cycles.map(
        cycle => {
          if (cycle.id == activeCycleId) {
            return {...cycle, finishedDate: new Date()}
          } else {
            return cycle
          }
        }
      )
    ),
    setActiveCycleId(null)
  }

  return(
    <CyclesContext.Provider 
      value={{ 
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