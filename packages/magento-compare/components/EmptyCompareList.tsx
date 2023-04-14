import { FullPageMessage, IconSvg, iconCompare } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

export function EmptyCompareList() {
  return (
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
  )
}
