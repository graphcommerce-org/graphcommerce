import { useQuery } from '@apollo/client'
import { IsLoggedInDocument } from 'generated/graphql'
import React from 'react'

export default function IsLoggedIn() {
  const { data, loading, error } = useQuery(IsLoggedInDocument)

  return (
    <div>
      Ingelogd: {data?.isLoggedIn ? 'JA' : 'Nee'},{loading ? 'Loading...' : ''}
      {error || 'geen error'}
    </div>
  )
}
