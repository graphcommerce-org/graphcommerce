import { sxx } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Button, Fab, Typography } from '@mui/material'
import { iconClose } from '../icons'
import { IconSvg, useIconSvgSize } from '../IconSvg'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { OverlayStickyBottom } from '../Overlay/components/OverlayStickyBottom'
import { extendableComponent } from '../Styles'
import { useFabSize } from '../Theme'
import type { PanelActionsProps } from './types'

const { classes } = extendableComponent(
  'OverlayPanelActions' as const,
  ['root', 'header', 'content', 'footer'] as const,
)

export function OverlayPanelActions(props: PanelActionsProps) {
  const { title, children, onReset, onApply, onClose, sx = [] } = props

  const fabSize = useFabSize('small')
  const svgSize = useIconSvgSize('large')

  return (
    <>
      <LayoutOverlayHeader
        noAlign
        sx={sxx({ '&.noAlign': { mb: 0 } }, sx)}
        switchPoint={-10000}
        size='small'
        primary={
          onReset && (
            <Button variant='inline' color='primary' onClick={onReset}>
              <Trans>Reset</Trans>
            </Button>
          )
        }
        secondary={
          <Fab
            color='inherit'
            onClick={onClose}
            sx={{
              boxShadow: 'none',
              ml: `calc((${fabSize} - ${svgSize}) * -0.5)`,
            }}
            size='small'
            aria-label={t`Close`}
          >
            <IconSvg src={iconClose} size='large' aria-hidden />
          </Fab>
        }
      >
        <Typography variant='h6' component='span'>
          {title}
        </Typography>
      </LayoutOverlayHeader>

      <Box sx={{ flex: 1, px: 2, pt: 2 }} className={classes.content}>
        {children}
      </Box>

      <OverlayStickyBottom className={classes.footer} sx={{ px: 2, py: 2 }}>
        <Button
          type='button'
          onClick={onApply}
          variant='pill'
          color='primary'
          size='large'
          fullWidth
          // sx={(theme) => ({ mt: theme.spacings.md })}
        >
          <Trans>Apply</Trans>
        </Button>
      </OverlayStickyBottom>
    </>
  )
}
