import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, ChipProps, Portal, TextField } from '@mui/material'
import React, { forwardRef, PropsWithChildren, ReactElement, useMemo, useState } from 'react'
import { LinkOrButton } from '../Button'
import { IconSvg } from '../IconSvg'
import { LayoutTitle } from '../Layout'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { Overlay } from '../Overlay'
import { OverlayButton } from '../Overlay/components/OverlayButton'
import { iconClose } from '../icons'

type OverlayFilterPanelProps = PropsWithChildren<
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

type OverlayFilterContentProps = Pick<
  OverlayFilterPanelProps,
  'onClose' | 'setOpenEl' | 'label' | 'onReset' | 'children'
>

const OverlayFilterContent = forwardRef<HTMLElement, OverlayFilterContentProps>(
  ({ setOpenEl, label, children, onReset }, ref) => {
    const [search, setSearch] = useState<string>()
    const castedChildren = children as ReactElement
    const menuLength = castedChildren?.props.items?.length
    const filteredChildren = useMemo(() => {
      const { items } = castedChildren.props
      const filteredItems = items?.filter((item) => {
        const optionLabelLowerCase = item.option.label.toLowerCase()
        const searchLowerCase = search?.toLowerCase() ?? ''
        return search ? optionLabelLowerCase?.includes(searchLowerCase) : true
      })
      return React.cloneElement(castedChildren, { items: filteredItems })
    }, [castedChildren, search])

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
            <LinkOrButton button={{ variant: 'text' }} color='primary' onClick={onReset}>
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
              setOpenEl(null)
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

export function OverlayFilterPanel(props: OverlayFilterPanelProps) {
  const { openEl, onClose } = props
  const open = Boolean(openEl)

  if (!open) return null
  return (
    <Portal>
      <Overlay
        active={!!openEl}
        onClosed={onClose ?? (() => {})}
        variantSm='bottom'
        sizeSm='minimal'
        overlayPaneProps={{
          initial: false,
        }}
      >
        <OverlayFilterContent {...props} />
      </Overlay>
    </Portal>
  )
}
