import { alpha, Chip, ChipProps, Typography, useEventCallback } from '@mui/material'
import React, { useState } from 'react'
import { IconSvg } from '../IconSvg'
import { responsiveVal } from '../Styles'
import { iconChevronDown, iconChevronUp } from '../icons'
import { DynamicPanel } from './Panel/DynamicPanel'
import { PanelProps } from './types'

export type ChipPanelProps = React.PropsWithChildren<{
  chipProps?: ChipProps<'button'>
  panelProps?: Omit<PanelProps, 'active'>
  selected: boolean
  selectedLabel: React.ReactNode
  filterValue?: number
}>

export function ChipPanel(props: ChipPanelProps) {
  const { chipProps, panelProps, ...chipMenuProps } = props
  const { selected, selectedLabel, filterValue, children } = chipMenuProps

  const [activeEl, setActiveEl] = useState<HTMLElement | null>(null)

  const id = 'filterpopper' as const

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

  const toggle = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    setActiveEl((el) => (el !== e.currentTarget ? e.currentTarget : null))
  })

  const labelComponent = (
    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row' }}>
      {selected && selectedLabel ? selectedLabel : chipProps?.label}
      {chevronIcon}
    </Typography>
  )

  const handleClose = () => {
    panelProps?.onClose?.()
    setActiveEl(null)
  }

  return (
    <>
      <Chip
        {...chipProps}
        aria-describedby={id}
        size='responsive'
        component='button'
        color={selectedAndMenuHidden ? 'primary' : 'default'}
        clickable
        label={labelComponent}
        onClick={toggle}
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
      <DynamicPanel
        {...panelProps}
        label={chipProps?.label}
        activeEl={activeEl}
        active={Boolean(activeEl)}
        onClose={handleClose}
      >
        {children}
      </DynamicPanel>
    </>
  )
}
