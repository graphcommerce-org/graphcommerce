import { useQuery as useQueryApollo } from '@apollo/client'
import { useEffect, useState } from 'react'

// eslint-disable-next-line prefer-const, import/no-mutable-exports
export const useClientQuery: typeof useQueryApollo = (query, options) => {
  const [firstRender, setFirstRender] = useState(true)

  const response = useQueryApollo(query, options)

  useEffect(() => {
    if (firstRender) setFirstRender(false)
  }, [firstRender])

  return response
}
