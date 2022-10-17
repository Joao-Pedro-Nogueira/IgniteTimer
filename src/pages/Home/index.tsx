import { Play, HandPalm, } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import {differenceInSeconds} from 'date-fns'
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
})

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState <string|null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0


  useEffect(() => {
    var interval: number

    if(activeCycle) {
      interval = setInterval(() => {
        const currentDiference = differenceInSeconds(new Date(), activeCycle.startDate)

        setSecondsPassed(currentDiference)

        if (currentDiference>=totalSeconds) {
          finishCycle()
        }

      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds])
    
    type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
    
    function handleCreateNewCycle(data: newCycleFormData) {
      
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
      reset()
    }

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

    console.log(cycles)


    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
      activeCycle ? document.title = `Timer ${minutes}:${seconds}` : document.title = `Ignite Timer`
    }, [minutes, seconds, activeCycle])
    
    const task = watch('task')
    const isTaskEmpty = !task
    
    return (
      <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>

          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
            />

          <datalist id="task-suggestions">
            <option value="Treinar" />
            <option value="Trabalhar" />
            <option value="Assistir Fórmula 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            min={1}
            max={60}
            step={1}
            type="number"
            placeholder="00"
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
            />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        { activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24}/>
          Interromper
        </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isTaskEmpty}>
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        )}

      </form>
    </HomeContainer>
  )
}
