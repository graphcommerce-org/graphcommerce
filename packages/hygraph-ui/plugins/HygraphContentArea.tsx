import type { ContentArea } from '@graphcommerce/content-areas'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { RowRenderer } from '../components'

export const component = 'ContentArea'
export const exported = '@graphcommerce/content-areas/components/ContentArea/ContentArea'

const HygraphContentArea: ReactPlugin<typeof ContentArea> = (props) => {
  const { Prev, ...rest } = props
  const { content, renderer } = props

  return (
    <>
      <Prev {...rest} />
      {content.hygraphPage && <RowRenderer {...content.hygraphPage} renderer={renderer} />}
    </>
  )
}

export const Plugin = HygraphContentArea
