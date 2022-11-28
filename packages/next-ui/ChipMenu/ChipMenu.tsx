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
  onApply?: () => void
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

  let chevronIcon = <IconSvg src={iconChevronDown} size='medium' sx={{ ml: 1, mr: -1 }} />
  if (activeEl) chevronIcon = <IconSvg src={iconChevronUp} size='medium' sx={{ ml: 1, mr: -1 }} />
  if (filterValue)
    chevronIcon = (
      <Typography
        variant='caption'
        color='primary.main'
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 1,
        }}
      >
        + {filterValue}
      </Typography>
    )

  const selectedAndMenuHidden = selected && !activeEl

  const deactivate = useEventCallback(() => setActiveEl(null))

  const toggle = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    setActiveEl((el) => (el !== e.currentTarget ? e.currentTarget : null))
  })

  const labelComponent = (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {selected && selectedLabel ? selectedLabel : label}
      {chevronIcon}
    </Box>
  )

  return (
    <>
      <Chip
        aria-describedby={id}
        component='button'
        size='responsive'
        color={selectedAndMenuHidden ? 'primary' : 'default'}
        clickable
        label={labelComponent}
        onClick={toggle}
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
