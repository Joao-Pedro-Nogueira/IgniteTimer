import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styes";
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { CyclesContext } from "../..";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo precisa ser de, no mínimo, 5 minutos')
  .max(60, 'O ciclo pode ser de, no máximo, 60 minutos')
})

type newCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const {activeCycle, activeCycleId, finishCycle} = useContext(CyclesContext)


  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  
  const task = watch('task')
  const isTaskEmpty = !task
  
  return(
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
          min={5}
          max={60}
          step={5}
          type="number"
          placeholder="00"
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

      <span>minutos.</span>
    </FormContainer>
  )

}