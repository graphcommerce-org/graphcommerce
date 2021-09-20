import { useRouter } from 'next/router'
import { useEffect } from 'react'

type useGTMPageViewEventProps = {
  variables?: { [key: string]: string | number }
}

export default function useGTMPageViewEvent(props: useGTMPageViewEventProps = {}) {
  const { variables } = props
  const router = useRouter()

  useEffect(() => {
    const onRouteChangeComplete = (url: string) => {
      const win = window as any

      win.dataLayer.push({
        event: 'pageview',
        page: url,
        ...variables,
      })
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events, variables])
}
