import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { event } from '../lib/event'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'analytics'

function AllPagesPageview(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  const { events } = useRouter()

  useEffect(() => {
    const onRouteChangeComplete = (url: string) => {
      /**
       * Todo: the actual page_view event is currently disabled, because we run the risk of double counting page views.
       * https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manually_send_page_view_events
       *
       * https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=event
       */
      // event('page_view', {
      //   page_title: '<Page Title>',
      //   page_location: '<Page Location>',
      // })
      event('pageview', { page: url })
    }

    events.on('routeChangeComplete', onRouteChangeComplete)
    return () => events.off('routeChangeComplete', onRouteChangeComplete)
  }, [events])

  return <Prev {...rest} />
}

export const Plugin = AllPagesPageview
