import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Trans } from '@lingui/react'
import {
  ChipProps,
  Theme,
  useMediaQuery,
  Box,
  Portal,
  Popper,
  ClickAwayListener,
  Fade,
  Slide,
} from '@mui/material'
import { FC, forwardRef, PropsWithChildren } from 'react'
import { Button } from '../Button'
import { IconSvg } from '../IconSvg'
import { Overlay } from '../Overlay'
import { iconClose } from '../icons'

type ResponsiveMenuProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component'>
> & {
  chip: EmotionJSX.Element
  openEl: null | HTMLElement
  setOpenEl: (input: null) => void
  onClose?: () => void
  onReset?: (event: any) => void
}

type MenuContentProps = Pick<
  ResponsiveMenuProps,
  'onClose' | 'setOpenEl' | 'label' | 'onReset' | 'children'
>

const MenuContent = forwardRef<any, MenuContentProps>(
  ({ onClose, onReset, setOpenEl, label, children }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minWidth: 300,
        maxheight: 500,
        backgroundColor: 'background.paper',
        padding: 2,
      }}
    >
      <Box
        sx={{
          marginBottom: 2,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button
          variant='inline'
          onClick={() => {
            if (onClose) onClose()
            setOpenEl(null)
          }}
          sx={{ minWidth: '45px' }}
        >
          <IconSvg src={iconClose} size='medium' />
        </Button>
        {label}
        <Button variant='inline' onClick={onReset}>
          Reset
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'visible',
          overflowY: 'scroll',
          scroll: 20,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
        <Box sx={{ height: 40 }} />
        <Button
          form='filter-form'
          variant='pill'
          color='primary'
          size='large'
          sx={{
            position: 'sticky',
            bottom: 10,
            zIndex: 100,
            width: '100%',
          }}
          type='submit'
          onClick={() => {
            setOpenEl(null)
          }}
        >
          <Trans id='Apply' />
        </Button>
      </Box>
    </Box>
  ),
)

export function ResponsiveMenu(props: ResponsiveMenuProps) {
  const { chip, openEl, setOpenEl, onClose, id = 'filterpopper' } = props
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))
  const open = Boolean(openEl)
  if (!isDesktop) {
    return (
      <>
        {chip}
        <Portal>
          <Overlay
            active={!!openEl}
            onClosed={() => {
              if (onClose) onClose()
              setOpenEl(null)
            }}
            sizeSm='minimal'
            variantSm='bottom'
            overlayPaneProps={{
              initial: false,
            }}
            sx={{
              zIndex: 'drawer',
              '& .LayoutOverlayBase-overlayPane': {
                padding: 2,
                maxHeight: '90vh',
              },
            }}
          >
            <MenuContent {...props} />
          </Overlay>
        </Portal>
      </>
    )
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (onClose) onClose()
        setOpenEl?.(null)
      }}
    >
      <Box>
        {chip}
        <Popper
          id={id}
          open={open}
          anchorEl={openEl}
          // disablePortal
          placement='bottom'
          sx={{ paddingTop: 1, zIndex: 1000 }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <div>
                <MenuContent {...props} />
              </div>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
