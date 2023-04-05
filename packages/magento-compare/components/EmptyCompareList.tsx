import {
  FullPageMessage,
  IconSvg,
  iconCompare,
  LayoutOverlayHeader,
  LayoutTitle,
  PageMeta,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

export function EmptyCompareList() {
  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Compare products')} metaRobots={['noindex']} />
      <LayoutOverlayHeader switchPoint={0}>
        <LayoutTitle size='small' component='span' icon={iconCompare}>
          <Trans id='Compare' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <FullPageMessage
        title={<Trans id='Your comparelist is empty' />}
        icon={<IconSvg src={iconCompare} size='xxl' />}
        button={
          <Button href='/' variant='pill' color='secondary' size='large'>
            <Trans id='Continue shopping' />
          </Button>
        }
      >
        <Trans id='Discover our collection and add items to your comparelist!' />
      </FullPageMessage>
    </>
  )
}
