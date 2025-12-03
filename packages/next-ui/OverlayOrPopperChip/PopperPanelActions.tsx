import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Button, Fab, Typography } from '@mui/material'
import { iconClose } from '../icons'
import { IconSvg, useIconSvgSize } from '../IconSvg'
import { LayoutHeader } from '../Layout'
import { OverlayStickyBottom } from '../Overlay/components/OverlayStickyBottom'
import { useFabSize } from '../Theme'
import type { PanelActionsProps } from './types'

export function PopperPanelActions(props: PanelActionsProps) {
  const { title, children, onReset, onClose, onApply, sx = [] } = props

  const fabSize = useFabSize('small')
  const svgSize = useIconSvgSize('large')

  return (
    <>
      <LayoutHeader
        noAlign
        sx={[{ '&.noAlign': { mb: 0 } }, ...(Array.isArray(sx) ? sx : [sx])]}
        switchPoint={-10000}
        size='small'
        primary={
          onReset && (
            <Button variant='text' color='primary' size='medium' onClick={onReset}>
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
        <Typography
          variant='subtitle1'
          component='span'
          sx={{
            display: 'block',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
      </LayoutHeader>

      <Box sx={{ flex: 1, px: 2 }}>{children}</Box>

      <OverlayStickyBottom sx={{ px: 2, py: 2 }}>
        <Button
          type='button'
          onClick={onApply}
          variant='pill'
          size='medium'
          color='primary'
          fullWidth
        >
          <Trans>Apply</Trans>
        </Button>
      </OverlayStickyBottom>
    </>
  )
}
