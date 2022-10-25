import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import {
  ChipProps,
  Theme,
  useMediaQuery,
  Box,
  Portal,
  Popper,
  ClickAwayListener,
  Fab,
} from '@mui/material'
import { forwardRef, PropsWithChildren } from 'react'
import { Button, LinkOrButton } from '../Button'
import { IconSvg, useIconSvgSize } from '../IconSvg'
import { LayoutTitle } from '../Layout'
import { LayoutHeaderContent } from '../Layout/components/LayoutHeaderContent'
import { Overlay } from '../Overlay'
import { useFabSize } from '../Theme'
import { iconClose } from '../icons'

type ResponsiveMenuProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component'>
> & {
  chip: EmotionJSX.Element
  openEl: null | HTMLElement
  setOpenEl: (input: null) => void
  onClose?: () => void
  onReset?: (event: any) => void
  actionable?: boolean
}

type MenuContentProps = Pick<
  ResponsiveMenuProps,
  'onClose' | 'setOpenEl' | 'label' | 'onReset' | 'children' | 'actionable'
> & { isDesktop: boolean }

const MenuContent = forwardRef<any, MenuContentProps>(
  ({ onClose, onReset, setOpenEl, label, children, isDesktop, actionable }, ref) => {
    const fabSize = useFabSize('responsive')
    const svgSize = useIconSvgSize('large')

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minWidth: 350,
          backgroundColor: 'background.paper',
          overflow: 'hidden',
          maxHeight: isDesktop ? 700 : '85vh',
        }}
      >
        <LayoutHeaderContent
          switchPoint={0}
          sx={isDesktop ? undefined : { position: 'static' }}
          sxBg={{ boxShadow: 0 }}
          left={
            <Fab
              color='inherit'
              onClick={onClose}
              sx={{
                boxShadow: 'none',
                marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
              }}
              aria-label={i18n._(/* i18n */ 'Close')}
            >
              <IconSvg src={iconClose} size='medium' aria-hidden />
            </Fab>
          }
          right={
            actionable ? (
              <LinkOrButton
                button={{ variant: 'inline', size: 'large' }}
                color='primary'
                onClick={onReset}
              >
                <Trans id='Reset' />
              </LinkOrButton>
            ) : null
          }
        >
          <LayoutTitle size='small' component='span'>
            {label}
          </LayoutTitle>
        </LayoutHeaderContent>
        <Box
          sx={(theme) => ({
            flex: 1,
            padding: `0 ${theme.page.horizontal}`,
            overflow: 'visible',
            overflowY: 'scroll',
            marginTop: isDesktop ? 8 : 1,
          })}
        >
          {children}
        </Box>
        {actionable ? (
          <Button
            form='filter-form'
            variant='pill'
            color='primary'
            size='large'
            sx={(theme) => ({
              margin: theme.spacings.xxs,
            })}
            type='submit'
            onClick={() => {
              setOpenEl(null)
            }}
          >
            <Trans id='Apply' />
          </Button>
        ) : null}
      </Box>
    )
  },
)

export function ResponsiveMenu(props: ResponsiveMenuProps) {
  const { chip, openEl, setOpenEl, onClose } = props
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))
  const open = Boolean(openEl)

  console.log({ open })

  if (!isDesktop) {
    return (
      <>
        {chip}
        <Portal>
          <Overlay
            active={!!openEl}
            onClosed={onClose ?? (() => {})}
            sizeSm='minimal'
            variantSm='bottom'
            overlayPaneProps={{
              initial: false,
            }}
            sx={{
              zIndex: 'drawer',
              '& .LayoutOverlayBase-overlayPane': {
                padding: 2,
                // maxHeight: '90vh',
              },
            }}
          >
            <MenuContent {...props} isDesktop={isDesktop} />
          </Overlay>
        </Portal>
      </>
    )
  }

  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      onClickAway={() => {
        if (onClose) onClose()
        setOpenEl?.(null)
      }}
    >
      <Box>
        {chip}
        <Popper
          open={open}
          anchorEl={openEl}
          sx={(theme) => ({
            boxShadow: 12,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
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
          ]}
        >
          <MenuContent {...props} isDesktop={isDesktop} />
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
