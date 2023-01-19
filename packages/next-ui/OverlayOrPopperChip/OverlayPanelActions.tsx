import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, TextField, Typography } from '@mui/material'
import React, { useState, ReactElement, useMemo, startTransition } from 'react'
import { LinkOrButton } from '../Button'
import { IconSvg } from '../IconSvg'
import { LayoutHeader, LayoutTitle } from '../Layout'
import { OverlayButton } from '../Overlay/components/OverlayButton'
import { extendableComponent } from '../Styles'
import { iconClose } from '../icons'
import { PanelActionsProps } from './types'

const { classes } = extendableComponent(
  'OverlayPanelActions' as const,
  ['root', 'header', 'content', 'footer'] as const,
)

export const OverlayPanelActions = (props: PanelActionsProps) => {
  const { title, children, onReset, onApply, onClose, sx = [] } = props

  const maxLength = 20

  const [search, setSearch] = useState<string>()
  const castedChildren = children as ReactElement
  const menuLength = castedChildren?.props.items?.length

  const inSearchMode = menuLength > maxLength

  return (
    <Box
      sx={[{ display: 'flex', flexDirection: 'column' }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={classes.root}
    >
      <LayoutHeader
        noAlign
        sx={{ '&.noAlign': { mb: 0 } }}
        switchPoint={0}
        size='small'
        primary={
          onReset && (
            <LinkOrButton button={{ variant: 'text' }} color='primary' onClick={onReset}>
              <Trans id='Reset' />
            </LinkOrButton>
          )
        }
        secondary={
          <LinkOrButton
            button={{ variant: 'inline' }}
            color='inherit'
            startIcon={<IconSvg src={iconClose} size='medium' />}
            onClick={onClose}
          />
        }
      >
        <Typography variant='h6' component='span'>
          {title}
        </Typography>
      </LayoutHeader>

      <Box sx={(theme) => ({ flex: 1, px: theme.page.horizontal })} className={classes.content}>
        {children}

        <Box sx={(theme) => ({ height: theme.spacings.xxl })} />
        <OverlayButton
          type='button'
          onClick={onApply}
          variant='pill'
          color='primary'
          size='large'
          sx={{ position: 'absolute', left: 10, right: 10 }}
        >
          <Trans id='Apply' />
        </OverlayButton>
      </Box>
    </Box>
  )
}
