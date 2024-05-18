import { useCallback, useEffect, useState } from "react"

export function useLocalStorage(
  key: string,
  initialValue: { [key: string]: string | {} | undefined }
) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.error(error)
        return initialValue
      }
    }
    return initialValue
  })

  const setValue = (value: { [key: string]: string }) => {
    if (typeof window !== "undefined") {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (storedValue === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      }
    }
  }, [key, storedValue])

  const removeStorage = useCallback(() => {
    if (typeof window !== "undefined") {
      setStoredValue(undefined)
    }
  }, [])

  return [storedValue, setValue, removeStorage]
}
