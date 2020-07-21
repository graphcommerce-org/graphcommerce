import React from 'react'
import { useIsLoggedInQuery } from 'generated/apollo'

export default function IsLoggedIn() {
  const { data, loading, error } = useIsLoggedInQuery()

  return (
    <div>
      Ingelogd: {data?.isLoggedIn ? 'JA' : 'Nee'},{loading ? 'Loading...' : ''}
      {error || 'geen error'}
    </div>
  )
}
