import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { DraftModeLoader } from '../components/DraftMode/DraftModeLoader'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, router, ...rest } = props

  const { isPreview } = router

  return (
    <>
      <Prev {...rest} router={router} />
      {isPreview && <DraftModeLoader />}
    </>
  )
}
