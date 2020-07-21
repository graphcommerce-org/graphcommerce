import { useState, useEffect } from 'react'

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    // todo: check for token invalidation timeout
    const token = window.localStorage.getItem('customer_token')
    if (token) setIsLoggedIn(!!token)
  }, [])

  return isLoggedIn
}
