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
import { LayoutOverlaySize, Overlay } from '../Overlay'
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
  mode: LayoutOverlaySize
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
          // justifyContent: 'space-between',
          minWidth: 350,
          backgroundColor: 'background.paper',
          height: '100%',
        }}
      >
        <LayoutHeaderContent
          switchPoint={0}
          sx={{ position: 'relative', mb: 0.5 }}
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
            maxHeight: isDesktop ? '500px' : 'calc(99vh - 275px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
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
  const { chip, openEl, setOpenEl, onClose, mode } = props
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))
  const open = Boolean(openEl)

  if (!isDesktop) {
    return (
      <>
        {chip}
        <Portal>
          <Overlay
            active={!!openEl}
            onClosed={onClose ?? (() => {})}
            sizeSm={mode}
            variantSm='bottom'
            overlayPaneProps={{
              initial: false,
            }}
            sx={{ '& .LayoutOverlayBase-overlayPane': { p: 1 } }}
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
            zIndex: 1,
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
          <MenuContent {...props} isDesktop={isDesktop} />
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
