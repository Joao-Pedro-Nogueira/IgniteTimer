import { Play, HandPalm, } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useContext, useEffect, useState } from "react";
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
import { CyclesContext } from "../../../src/contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1, 'O ciclo precisa ser de, no mínimo, 5 minutos')
  .max(60, 'O ciclo pode ser de, no máximo, 60 minutos')
})

type newCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  
  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } =  newCycleForm
  const task = watch('task')
  const isTaskEmpty = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">


        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        

        { activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
