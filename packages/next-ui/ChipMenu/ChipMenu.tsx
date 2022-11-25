import {
  alpha,
  Box,
  Breakpoint,
  Chip,
  ChipProps,
  SxProps,
  Theme,
  Typography,
  useEventCallback,
} from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { useMatchMedia } from '../hooks/useMatchMedia'
import { iconChevronDown, iconChevronUp } from '../icons'
import { OverlayFilterPanel } from './OverlayFilter/OverlayFilterPanel'
import { PopperFilterPanel } from './PopperFilter/PopperFilterPanel'

export type ChipMenuProps = Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'> & {
  selectedLabel?: React.ReactNode
  children?: React.ReactNode
  filterValue?: string | ReactNode
  selected: boolean
  onReset?: () => void
  sx?: SxProps<Theme>
  breakpoint?: Breakpoint
}

export function ChipMenu(props: ChipMenuProps) {
  const {
    children,
    label,
    selectedLabel,
    selected,
    onDelete,
    onReset,
    filterValue,
    accessKey,
    id = 'filterpopper',
    breakpoint = 'md',
    ...chipProps
  } = props

  const [activeEl, setActiveEl] = useState<HTMLElement | null>(null)

  const matchMedia = useMatchMedia()
  const active = Boolean(activeEl)
  const mode = active && matchMedia.up(breakpoint) ? 'popper' : 'overlay'

  let deleteIcon = <IconSvg src={iconChevronDown} size='medium' />
  if (activeEl) deleteIcon = <IconSvg src={iconChevronUp} size='medium' />
  if (filterValue)
    deleteIcon = (
      <Box
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: 5,
          display: 'flex',
          minWidth: '22px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' color='primary.contrastText'>
          {filterValue}
        </Typography>
      </Box>
    )

  const selectedAndMenuHidden = selected && !activeEl

  const deactivate = useEventCallback(() => setActiveEl(null))
  const activate = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    setActiveEl(e.currentTarget)
  })
  const toggle = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    setActiveEl((el) => (el !== e.currentTarget ? e.currentTarget : null))
  })

  return (
    <>
      <Chip
        aria-describedby={id}
        component='button'
        size='responsive'
        color={selectedAndMenuHidden ? 'primary' : 'default'}
        clickable
        label={selected && selectedLabel ? selectedLabel : label}
        onDelete={onDelete || toggle}
        onClick={activate}
        deleteIcon={deleteIcon}
        {...chipProps}
        sx={(theme) => ({
          '& .MuiChip-deleteIcon': {
            ml: '0px',
          },
          ...(selected
            ? {
                border: `1px solid ${theme.palette.primary.main ?? theme.palette.primary.main}`,
                boxShadow: `inset 0 0 0 1px ${
                  theme.palette.primary.main ?? theme.palette.primary.main
                },0 0 0 4px ${alpha(
                  theme.palette.primary.main,
                  theme.palette.action.hoverOpacity,
                )} !important`,
              }
            : {}),
        })}
      />
      {mode === 'overlay' && (
        <OverlayFilterPanel {...props} active={active} onClosed={deactivate}>
          {children}
        </OverlayFilterPanel>
      )}
      {mode === 'popper' && (
        <PopperFilterPanel {...props} openEl={activeEl} onClose={deactivate}>
          {children}
        </PopperFilterPanel>
      )}
    </>
  )
}
