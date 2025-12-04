import { FullPageMessage, iconCompare, IconSvg, OverlayCloseButton } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'

export function EmptyCompareList() {
  return (
    <FullPageMessage
      title={<Trans>Your comparelist is empty</Trans>}
      icon={<IconSvg src={iconCompare} size='xxl' />}
      button={
        <OverlayCloseButton variant='pill' color='secondary' size='large'>
          <Trans>Continue shopping</Trans>
        </OverlayCloseButton>
      }
    >
      <Trans>
        Discover our collection and add items to your comparelist!
      </Trans>
    </FullPageMessage>
  )
}
