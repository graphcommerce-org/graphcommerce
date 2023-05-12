import { useRouter } from 'next/compat/router'

export const usePageRouter = () => {
  console.warn('usePageRouter does nothing, use next/router useRouter instead')
  return useRouter()
}
