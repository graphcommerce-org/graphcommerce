import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Trans } from '@lingui/react'
import {
  ChipProps,
  Theme,
  useMediaQuery,
  Box,
  Portal,
  Popper,
  Grow,
  ClickAwayListener,
} from '@mui/material'
import { forwardRef, PropsWithChildren } from 'react'
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
> & { isDesktop: boolean }

const MenuContent = forwardRef<any, MenuContentProps>(
  ({ onClose, onReset, setOpenEl, label, children, isDesktop }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: 325,
        maxHeight: isDesktop ? 500 : '90vh',
        backgroundColor: 'background.paper',
        padding: isDesktop ? '15px 15px 5px 15px' : 0,
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
          padding: 2,
          overflow: 'visible',
          overflowY: 'scroll',
          scroll: 20,
          '&::-webkit-scrollbar': {
            display: isDesktop ? 'visable' : 'none',
          },
        }}
      >
        {children}
      </Box>
      <Button
        form='filter-form'
        variant='pill'
        color='primary'
        size='large'
        sx={{
          width: '100%',
          margin: 1,
        }}
        type='submit'
        onClick={() => {
          setOpenEl(null)
        }}
      >
        <Trans id='Apply' />
      </Button>
    </Box>
  ),
)

export function ResponsiveMenu(props: ResponsiveMenuProps) {
  const { chip, openEl, setOpenEl, onClose } = props
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
            <MenuContent {...props} isDesktop={isDesktop} />
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
          open={open}
          anchorEl={openEl}
          sx={{ padding: 1, zIndex: 1 }}
          keepMounted
          disablePortal
        >
          <MenuContent {...props} isDesktop={isDesktop} />
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
