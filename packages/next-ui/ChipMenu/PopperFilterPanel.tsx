import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, ChipProps, ClickAwayListener, Popper, TextField } from '@mui/material'
import React, { forwardRef, PropsWithChildren, ReactElement, useMemo, useState } from 'react'
import { LinkOrButton } from '../Button'
import { IconSvg } from '../IconSvg'
import { LayoutTitle } from '../Layout'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { OverlayButton } from '../Overlay/components/OverlayButton'
import { iconClose } from '../icons'

type PopperFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component'>
> & {
  openEl: null | HTMLElement
  setOpenEl: (input: null) => void
  onClose?: () => void
  onReset?: (event: any) => void
  allowReset?: boolean
}

type PopperFilterContentProps = Pick<
  PopperFilterPanelProps,
  'onClose' | 'setOpenEl' | 'label' | 'onReset' | 'children' | 'allowReset'
>

const PopperFilterContent = forwardRef<HTMLElement, PopperFilterContentProps>(
  ({ setOpenEl, label, children, allowReset, onReset }, ref) => {
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

    return (
      <Box
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
              button={{ variant: 'text' }}
              color='primary'
              onClick={onReset}
              disabled={!allowReset}
            >
              <Trans id='Reset' />
            </LinkOrButton>
          }
          secondary={
            <LinkOrButton
              button={{ variant: 'inline' }}
              color='inherit'
              startIcon={<IconSvg src={iconClose} size='medium' />}
              onClick={() => setOpenEl(null)}
            />
          }
        >
          {menuLength > 8 ? (
            <TextField
              type='search'
              fullWidth
              variant='standard'
              size='small'
              color='primary'
              placeholder={i18n._(/* 18n */ 'Search {filter}', { filter: label })}
              onChange={(e) => setSearch(e.target.value)}
            />
          ) : (
            <LayoutTitle size='small' component='span'>
              {label}
            </LayoutTitle>
          )}
        </LayoutOverlayHeader>

        <Box
          sx={(theme) => ({
            mt: theme.appShell.headerHeightSm,
            flex: 1,
            padding: `0 ${theme.page.horizontal}`,
            overflow: 'visable',
            overflowY: 'scroll',
            maxHeight: '500px',
          })}
        >
          {filteredChildren}

          <Box sx={(theme) => ({ height: theme.spacings.xxl })} />
          <OverlayButton
            form='filter-form'
            variant='pill'
            size='large'
            type='submit'
            onClick={() => {
              setTimeout(() => setOpenEl(null), 500)
            }}
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              position: 'absolute',
              left: 10,
              right: 10,
            }}
          >
            <Trans id='Apply' />
          </OverlayButton>
        </Box>
      </Box>
    )
  },
)

export function PopperFilterPanel(props: PopperFilterPanelProps) {
  const { openEl, onClose, setOpenEl } = props
  const open = Boolean(openEl)

  if (!open) return null
  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      onClickAway={() => {
        if (onClose) onClose()
        setOpenEl?.(null)
      }}
    >
      <Popper
        open={open}
        anchorEl={openEl}
        sx={(theme) => ({
          boxShadow: 12,
          borderRadius: theme.shape.borderRadius,
          overflow: 'hidden',
          zIndex: 1,
          bgcolor: 'background.paper',
        })}
        keepMounted
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },

          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'viewport',
            },
          },
          {
            name: 'preventOverflow',
            enabled: false,
            options: {
              altAxis: true,
              altBoundary: false,
              tether: false,
              rootBoundary: 'viewport',
            },
          },
        ]}
      >
        <PopperFilterContent {...props} />
      </Popper>
    </ClickAwayListener>
  )
}
