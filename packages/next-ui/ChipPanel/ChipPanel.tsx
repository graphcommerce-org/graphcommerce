import { alpha, Chip, ChipProps, Typography, useEventCallback } from '@mui/material'
import React, { useState } from 'react'
import { IconSvg } from '../IconSvg'
import { responsiveVal } from '../Styles'
import { iconChevronDown, iconChevronUp } from '../icons'
import { OverlayOrPopperPanel } from './Panel/OverlayOrPopperPanel'
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
  const { onApply, onClose, onReset } = panelProps ?? {}

  const [activeEl, setActiveEl] = useState<HTMLElement | null>(null)

  const id = 'filterpopper' as const

  let chevronIcon = (
    <IconSvg
      src={activeEl ? iconChevronUp : iconChevronDown}
      size='medium'
      sx={{ ml: responsiveVal(3, 8), mr: '-5px' }}
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

  return (
    <>
      <Chip
        {...chipProps}
        aria-describedby={id}
        size='responsive'
        component='button'
        color={selectedAndMenuHidden ? 'primary' : 'default'}
        clickable
        label={
          <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row' }}>
            {selected && selectedLabel ? selectedLabel : chipProps?.label}
            {chevronIcon}
          </Typography>
        }
        onClick={useEventCallback((e: React.MouseEvent<HTMLElement>) =>
          setActiveEl((el) => (el !== e.currentTarget ? e.currentTarget : null)),
        )}
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
      <OverlayOrPopperPanel
        {...panelProps}
        label={chipProps?.label}
        activeEl={activeEl}
        onReset={
          onReset
            ? () => {
                onReset?.()
                setActiveEl(null)
              }
            : undefined
        }
        onClose={() => {
          onClose?.()
          setActiveEl(null)
        }}
        onApply={() => {
          onApply?.()
          setActiveEl(null)
        }}
      >
        {children}
      </OverlayOrPopperPanel>
    </>
  )
}
