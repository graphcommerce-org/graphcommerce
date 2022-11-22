import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Button, ChipProps, ClickAwayListener, Fab, Popper, TextField } from '@mui/material'
import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { LinkOrButton } from '../Button'
import { IconSvg } from '../IconSvg'
import { LayoutTitle } from '../Layout'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { iconClose } from '../icons'

const MAX_LENGTH = 7

type PopperFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> & {
  openEl: null | HTMLElement
  setOpenEl: (input: null) => void
  onClose?: () => void
  onReset?:
    | (React.MouseEventHandler<HTMLButtonElement> &
        React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLSpanElement>)
    | undefined
}

type PopperFilterContentProps = Pick<
  PopperFilterPanelProps,
  'onClose' | 'setOpenEl' | 'label' | 'onReset' | 'children'
>

const PopperFilterContent = forwardRef<HTMLElement, PopperFilterContentProps>(
  ({ setOpenEl, label, children, onReset }, ref) => {
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

    const inSearchMode = menuLength > MAX_LENGTH

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
              onClick={onReset}
            >
              <Trans id='Reset' />
            </LinkOrButton>
          }
          secondary={
            <Box sx={{ width: '74px', display: 'flex', justifyContent: 'center' }}>
              <Fab
                onClick={() => setOpenEl(null)}
                sx={{
                  boxShadow: 'none',
                }}
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
            ...{ overflow: 'visable', overflowY: inSearchMode ? 'scroll' : 'clip' },
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
            onClick={() => {
              setTimeout(() => setOpenEl(null), 500)
            }}
            sx={(theme) => ({
              position: 'sticky',
              bottom: theme.spacings.xs,
            })}
          >
            <Trans id='Apply' />
          </Button>
        </Box>
      </Box>
    )
  },
)

export function PopperFilterPanel(props: PopperFilterPanelProps) {
  const { openEl, onClose } = props
  const open = Boolean(openEl)

  if (!open) return null
  return (
    <ClickAwayListener
      mouseEvent='onClick'
      onClickAway={() => {
        if (onClose && openEl) onClose()
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
