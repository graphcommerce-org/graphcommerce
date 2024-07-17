import { useRouter } from 'next/router'

/**
 * @deprecated Use next/router useRouter instead
 */
export const usePageRouter = () => {
  console.warn('usePageRouter does nothing, use next/router useRouter instead')
  return useRouter()
}
