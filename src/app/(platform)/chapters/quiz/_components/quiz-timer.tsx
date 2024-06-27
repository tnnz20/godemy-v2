"use client"

import { useEffect, useState } from "react"

import { createTimerStore } from "../_store/useTimerStore"

const useTimerStore = createTimerStore(15 * 60 * 1000) // 15 minutes

export default function QuizTimer() {
  const { timerEndTime, timerDuration, startTimer, resetTimer } = useTimerStore()
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration)

  useEffect(() => {
    startTimer() // Start the timer when the component mounts
  }, [startTimer])

  useEffect(() => {
    if (timerEndTime) {
      const interval = setInterval(() => {
        const remaining = timerEndTime - Date.now()
        if (remaining <= 0) {
          clearInterval(interval)
          setTimeLeft(0)
          resetTimer()
          startTimer() // Restart the timer
        } else {
          setTimeLeft(remaining)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timerEndTime, resetTimer, startTimer])

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return <div>Timer: {formatTime(timeLeft)}</div>
}
