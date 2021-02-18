import { useRef, useEffect } from 'react'

export default function useScopeRef(scope?: string) {
  const scopeRef = useRef<string>(scope ?? Math.random().toString(36).substring(7)).current

  // useEffect(() => {
  //   if (scope !== scopeRef)
  //     console.error(`scope change from '${scopeRef}' to '${scope}', this is not supported`)
  // }, [scopeRef, scope])

  return scopeRef
}
