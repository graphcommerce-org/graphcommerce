import { useRouter } from 'next/router'

export const usePageRouter = () => {
  console.warn('usePageRouter does nothing, use next/router useRouter instead')
  return useRouter()
}
