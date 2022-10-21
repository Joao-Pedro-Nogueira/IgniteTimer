import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";


export function Countdown() {
  const {activeCycle, activeCycleId, finishCycle, secondsPassed, updateSecondsPassed} = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    var interval: number

    if(activeCycle) {
      interval = setInterval(() => {
        const currentDiference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        updateSecondsPassed(currentDiference)
        if (currentDiference>=totalSeconds) {
          finishCycle()
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, finishCycle, secondsPassed, updateSecondsPassed])

  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    activeCycle ? document.title = `Timer ${minutes}:${seconds}` : document.title = `Ignite Timer`
  }, [minutes, seconds, activeCycle])

  return(
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}