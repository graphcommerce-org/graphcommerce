import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const PreviewMode = dynamic(
  async () => (await import('../components/PreviewMode/PreviewMode')).PreviewMode,
  {},
)

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
  ifConfig: 'previewSecret',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, router, ...rest } = props
  const [enabled, setEnabled] = useState(router.isPreview)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'Backquote') {
        setEnabled((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handler, false)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Prev {...rest} router={router} />
      {enabled && <PreviewMode />}
    </>
  )
}
