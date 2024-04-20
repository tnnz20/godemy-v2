import { useCallback, useEffect, useState } from "react"

export function useLocalStorage(
  key: string,
  initialValue: { [key: string]: string | {} | undefined }
) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: { [key: string]: string }) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (storedValue === undefined) return localStorage.removeItem(key)
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  const removeStorage = useCallback(() => {
    setStoredValue(undefined)
  }, [])

  return [storedValue, setValue, removeStorage]
}
