import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Fab, TextField, Button, Box, Typography } from '@mui/material'
import React, { forwardRef, useState, ReactElement, useMemo } from 'react'
import { LinkOrButton } from '../../Button'
import { IconSvg } from '../../IconSvg'
import { LayoutTitle } from '../../Layout'
import { LayoutOverlayHeader } from '../../LayoutOverlay'
import { iconClose } from '../../icons'
import { FilterPanelProps } from '../types'

type PopperFilterContentProps = Pick<
  FilterPanelProps,
  'label' | 'onReset' | 'children' | 'maxLength' | 'onClosed' | 'onApply'
>

export const PopperFilterContent = forwardRef<HTMLElement, PopperFilterContentProps>(
  ({ label, children, onReset, onClosed, onApply, maxLength = 20 }, ref) => {
    const [search, setSearch] = useState<string>()
    const castedChildren = children as ReactElement
    const menuLength = castedChildren?.props.items?.length
    const filteredChildren = useMemo(() => {
      const { items } = (children as ReactElement).props
      const filteredItems = items?.filter((item) => {
        const optionLabelLowerCase = item.option.label.toLowerCase()
        const searchLowerCase = search?.toLowerCase() ?? ''
        return search ? optionLabelLowerCase?.includes(searchLowerCase) : true
      })
      return React.cloneElement(castedChildren, { items: filteredItems })
    }, [castedChildren, children, search])

    const inSearchMode = menuLength > maxLength

    const handleReset = () => {
      if (onReset) onReset()
      if (onClosed) onClosed()
      if (onApply) onApply()
    }

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 350,
        }}
      >
        <LayoutOverlayHeader
          switchPoint={0}
          primary={
            <LinkOrButton
              button={{ variant: 'text', size: 'medium', sx: { mr: 1 } }}
              color='primary'
              onClick={handleReset}
            >
              <Typography variant='body2'>
                <Trans id='Reset' />
              </Typography>
            </LinkOrButton>
          }
          secondary={
            <Box
              sx={{ width: '74px', display: 'flex', justifyContent: 'center' }}
              onClick={onClosed}
            >
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
            form='filter-form'
            variant='pill'
            size='large'
            type='submit'
            color='primary'
            fullWidth
            sx={(theme) => ({
              position: 'sticky',
              bottom: theme.spacings.xs,
              zIndex: 2,
            })}
            onClick={() => setTimeout(onClosed, 100)}
          >
            <Trans id='Apply' />
          </Button>
        </Box>
      </Box>
    )
  },
)
