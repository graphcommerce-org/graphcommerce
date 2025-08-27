import { FullPageMessage, iconCompare, IconSvg, OverlayCloseButton } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'

export function EmptyCompareList() {
  return (
    <FullPageMessage
      title={<Trans id='Your comparelist is empty' />}
      icon={<IconSvg src={iconCompare} size='xxl' />}
      button={
        <OverlayCloseButton variant='pill' color='secondary' size='large'>
          <Trans id='Continue shopping'>Continue shopping</Trans>
        </OverlayCloseButton>
      }
    >
      <Trans id='Discover our collection and add items to your comparelist!' />
    </FullPageMessage>
  )
}
