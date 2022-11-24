import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, ChipProps, Portal, TextField } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React, { PropsWithChildren, ReactElement, useMemo, useState } from 'react'
import { LinkOrButton } from '../Button'
import { IconSvg } from '../IconSvg'
import { LayoutTitle } from '../Layout'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { OverlayProps, useOverlayContext } from '../Overlay'
import { OverlayButton } from '../Overlay/components/OverlayButton'
import { Overlay } from '../Overlay/components/Overlay'
import { iconClose } from '../icons'

type OverlayFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> &
  Pick<OverlayProps, 'active' | 'onClosed'> & {
    onReset?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>
  }

type OverlayFilterContentProps = Pick<OverlayFilterPanelProps, 'label' | 'onReset' | 'children'>

function OverlayFilterContent(props: OverlayFilterContentProps) {
  const { label, children, onReset } = props

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

  const { close } = useOverlayContext()

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
          <LinkOrButton button={{ variant: 'text' }} color='primary' onClick={onReset}>
            <Trans id='Reset' />
          </LinkOrButton>
        }
        secondary={
          <LinkOrButton
            button={{ variant: 'inline' }}
            color='inherit'
            startIcon={<IconSvg src={iconClose} size='medium' />}
            onClick={close}
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
          onClick={close}
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
}

export function OverlayFilterPanel(props: OverlayFilterPanelProps) {
  const { active, onClosed } = props

  return (
    <Overlay onClosed={onClosed} active={active} variantSm='bottom' sizeSm='minimal'>
      <OverlayFilterContent {...props} />
    </Overlay>
  )
}
