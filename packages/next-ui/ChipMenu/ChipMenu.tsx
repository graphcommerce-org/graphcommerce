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
import dynamic from 'next/dynamic'
import React, { ReactNode, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { responsiveVal } from '../Styles'
import { useMatchMedia } from '../hooks/useMatchMedia'
import { iconChevronDown, iconChevronUp } from '../icons'

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

const OverlayFilterPanel = dynamic(
  async () => (await import('./OverlayFilter/OverlayFilterPanel')).OverlayFilterPanel,
)

const PopperFilterPanel = dynamic(
  async () => (await import('./PopperFilter/PopperFilterPanel')).PopperFilterPanel,
)

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

  const [firstActive, setFirstActive] = useState(false)
  const [activeEl, setActiveEl] = useState<HTMLElement | null>(null)

  const { up } = useMatchMedia()
  const active = Boolean(activeEl)
  const mode = active && up(breakpoint) ? 'popper' : 'overlay'

  let chevronIcon = (
    <IconSvg
      src={activeEl ? iconChevronUp : iconChevronDown}
      size='medium'
      sx={{
        ml: responsiveVal(3, 8),
        mr: '-5px',
      }}
    />
  )
  if (filterValue)
    chevronIcon = (
      <Typography
        variant='caption'
        color='primary.main'
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: responsiveVal(3, 8),
        }}
      >
        +{filterValue}
      </Typography>
    )

  const selectedAndMenuHidden = selected && !activeEl

  const deactivate = useEventCallback(() => setActiveEl(null))

  const toggle = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    setActiveEl((el) => (el !== e.currentTarget ? e.currentTarget : null))
    setFirstActive(true)
  })

  const labelComponent = (
    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row' }}>
      {selected && selectedLabel ? selectedLabel : label}
      {chevronIcon}
    </Typography>
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
      {firstActive && mode === 'overlay' && (
        <OverlayFilterPanel {...props} active={active} onClosed={deactivate}>
          {children}
        </OverlayFilterPanel>
      )}
      {firstActive && mode === 'popper' && (
        <PopperFilterPanel {...props} openEl={activeEl} onClose={deactivate}>
          {children}
        </PopperFilterPanel>
      )}
    </>
  )
}
