import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StarCountdownButton,
  TaskInput
} from "./styles";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState <string|null>(null)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  
  // interface newCycleFormData {
    //   task: string,
    //   minutesAmount: number
    // }
    
    type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
    
    function handleCreateNewCycle(data: newCycleFormData) {
      
      const id = String(new Date().getTime())
      
      const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount
      }
      
      setCycles((state) => [...state, newCycle])
      setActiveCycleId(id)
      reset()
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    console.log(activeCycle)
    
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
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Leitura" />
            <option value="Estudar NodeJS" />
            <option value="Fazer front-end do projeto" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            min={5}
            max={60}
            step={5}
            type="number"
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StarCountdownButton type="submit" disabled={isTaskEmpty}>
          <Play />
          Começar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  )
}
