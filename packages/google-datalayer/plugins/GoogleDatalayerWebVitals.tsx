import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useEffect } from 'react'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals/attribution'
import { useSendEvent } from '../api/sendEvent'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
  ifConfig: 'dataLayer.coreWebVitals',
}

/**
 * When a product is added to the Cart, send a Google Analytics event.
 *
 * Based on this information: https://github.com/GoogleChrome/web-vitals?tab=readme-ov-file#send-the-results-to-google-analytics
 */
export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  const sendEvent = useSendEvent()
  const sendCoreWebVitals = useEventCallback((m: Metric, debug_target?: string | undefined) => {
    sendEvent(`cwv_${m.name.toLowerCase()}`, {
      value: m.delta,
      debug_target,
      ...Object.fromEntries(Object.entries(m).map(([key, value]) => [`metric_${key}`, value])),
    })
  })

  useEffect(() => {
    const opts = { reportAllChanges: true }
    onCLS((m) => sendCoreWebVitals(m, m.attribution.largestShiftTarget))
    onFCP((m) => sendCoreWebVitals(m), opts)
    onFID((m) => sendCoreWebVitals(m, m.attribution.eventTarget), opts)
    onINP((m) => sendCoreWebVitals(m, m.attribution.eventTarget), opts)
    onLCP((m) => sendCoreWebVitals(m, m.attribution.element), opts)
    onTTFB((m) => sendCoreWebVitals(m), opts)
  }, [sendCoreWebVitals])

  return <Prev {...rest} />
}
