import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import { LinkOrButton } from '../../Button/LinkOrButton'
import { IconSvg } from '../../IconSvg'
import { iconClose } from '../../icons'

export function useShowClose() {
  const { overlayGroup } = usePageContext()
  return !!overlayGroup
}

export function LayoutHeaderClose() {
  const { closeSteps } = usePageContext()
  const onClick = useGo(closeSteps * -1)

  return (
    <LinkOrButton
      button={{ type: 'button', variant: 'pill' }}
      color='inherit'
      onClick={onClick}
      aria-label='Close'
      startIcon={<IconSvg src={iconClose} size='medium' />}
      // className={classes.close}
    >
      <Box component='span' sx={{ display: { xs: 'none', md: 'inline' } }}>
        <Trans>Close</Trans>
      </Box>
    </LinkOrButton>
  )
}
