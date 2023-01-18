import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Fab, TextField, Button, Box, Typography, ChipProps } from '@mui/material'
import React, { useState, ReactElement, useMemo } from 'react'
import { LinkOrButton } from '../Button'
import { IconSvg } from '../IconSvg'
import { LayoutTitle } from '../Layout'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { iconClose } from '../icons'
import { PanelProps } from './types'

type PopperPanelProps = Pick<ChipProps, 'label'> &
  Pick<PanelProps, 'children' | 'onApply' | 'onReset' | 'onClose' | 'maxLength'>

export function PopperPanelActions(props: PopperPanelProps) {
  const { label, children, onReset, onClose, onApply, maxLength = 20 } = props
  const [search, setSearch] = useState<string>()
  const castedChildren = children as ReactElement
  const menuLength = castedChildren?.props.items?.length
  const filteredChildren = useMemo(() => {
    const { items } = (children as ReactElement).props
    const filteredItems = items?.filter((item) => {
      return true

      const optionLabelLowerCase = item.option.label.toLowerCase()
      const searchLowerCase = search?.toLowerCase() ?? ''
      return search ? optionLabelLowerCase?.includes(searchLowerCase) : true
    })
    return React.cloneElement(castedChildren, { items: filteredItems })
  }, [castedChildren, children, search])

  const inSearchMode = menuLength > maxLength

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 350 }}>
      <LayoutOverlayHeader
        switchPoint={0}
        primary={
          onReset && (
            <LinkOrButton
              button={{ variant: 'text', size: 'medium', sx: { mr: 1 } }}
              color='primary'
              onClick={onReset}
            >
              <Typography variant='body2'>
                <Trans id='Reset' />
              </Typography>
            </LinkOrButton>
          )
        }
        secondary={
          <Box sx={{ width: '74px', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
            <Fab
              sx={(theme) => ({
                boxShadow: 'none',
                marginLeft: `calc(${theme.spacings.xxs} * -1)`,
              })}
              size='small'
              aria-label={i18n._(/* i18n */ 'Close')}
            >
              <IconSvg src={iconClose} size='medium' />
            </Fab>
          </Box>
        }
        sx={{
          '& .LayoutHeaderContent-content': { height: '50px', padding: 0 },
          '& .LayoutHeaderContent-bg': { height: '50px' },
        }}
      >
        {inSearchMode ? (
          <TextField
            type='search'
            variant='standard'
            size='small'
            color='primary'
            placeholder={i18n._(/* 18n */ 'Search {filter}', { filter: label })}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginX: 3 }}
          />
        ) : (
          <LayoutTitle size='small' component='span'>
            {label}
          </LayoutTitle>
        )}
      </LayoutOverlayHeader>

      <Box
        sx={(theme) => ({
          mt: `calc(${theme.appShell.headerHeightSm} + 5px)`,
          flex: 1,
          padding: `0 ${theme.page.horizontal}`,
          ...{ overflow: 'visable', overflowY: menuLength > 7 ? 'scroll' : 'clip' },
          maxHeight: '500px',
        })}
      >
        {filteredChildren}

        <Box sx={(theme) => ({ height: theme.spacings.sm })} />
        <Button
          type='button'
          onClick={onApply}
          variant='pill'
          size='large'
          color='primary'
          fullWidth
          sx={(theme) => ({
            position: 'sticky',
            bottom: theme.spacings.xs,
            zIndex: 2,
          })}
        >
          <Trans id='Apply' />
        </Button>
      </Box>
    </Box>
  )
}
