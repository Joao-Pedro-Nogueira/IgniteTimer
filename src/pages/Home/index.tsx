import { Play, HandPalm, } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useEffect, useState } from "react";
import {differenceInSeconds} from 'date-fns';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput
} from "./styles";
import { Countdown } from "./Components/Countdown";
import { NewCycleForm } from "./Components/NewCycleForm";

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  finishCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState <string|null>(null)
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)


  // function handleCreateNewCycle(data: newCycleFormData) {
  //   const id = String(new Date().getTime())
  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }
    
  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setSecondsPassed(0)
  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles(
      cycles.map(
        cycle => {
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
  

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">

        <CyclesContext.Provider value={{ activeCycle, activeCycleId, finishCycle }}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        { activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
          ) : (
          <StartCountdownButton type="submit" /*disabled={isTaskEmpty}*/>
            <Play size={24}/>
            Começar
          </StartCountdownButton>
          )
        }

      </form>
    </HomeContainer>
  )
}
