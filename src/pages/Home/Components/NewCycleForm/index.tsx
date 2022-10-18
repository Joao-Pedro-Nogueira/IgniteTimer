import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styes";
import * as zod from 'zod';
import { useForm, useFormContext } from 'react-hook-form';
import { useContext } from "react";
import { CyclesContext } from "../..";

export function NewCycleForm() {
  const {activeCycle} = useContext(CyclesContext)
  const { register } = useFormContext()
  
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
  )

}