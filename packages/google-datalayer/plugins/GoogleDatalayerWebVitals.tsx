import type { PagesProps } from '@graphcommerce/framer-next-pages'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useEffect } from 'react'
import webVitals, { Metric } from 'web-vitals/attribution'
import { event } from '../lib/event'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'analytics.coreWebVitals'

/** When a product is added to the Cart, send a Google Analytics event */
function GoogleDatalayerCoreWebVitals(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  useEffect(() => {
    const sendToGTM = (m: Metric, target?: string | undefined) => {
      event(`cwv_${m.name.toLowerCase()}`, { ...m, value: m.delta, target })
    }

    const opts = { reportAllChanges: true }
    webVitals.onCLS((m) => sendToGTM(m, m.attribution.largestShiftTarget), opts)
    webVitals.onFCP((m) => sendToGTM(m), opts)
    webVitals.onFID((m) => sendToGTM(m, m.attribution.eventTarget), opts)
    webVitals.onINP((m) => sendToGTM(m, m.attribution.eventTarget), opts)
    webVitals.onLCP((m) => sendToGTM(m, m.attribution.element), opts)
    webVitals.onTTFB((m) => sendToGTM(m), opts)
  })

  return <Prev {...rest} />
}

export const Plugin = GoogleDatalayerCoreWebVitals
