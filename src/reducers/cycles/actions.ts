import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE'
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload:{
      newCycle
    }
  }
}

export function interruptCurrentCycleAction(activeCycleId: string | null) {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload:{
      activeCycleId
    }
  }
}

export function finishCycleAction(activeCycleId: string | null) {
  return {
    type: ActionTypes.FINISH_CYCLE,
    payload:{
      activeCycleId
    }
  }
}


