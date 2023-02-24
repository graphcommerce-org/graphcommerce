import { alpha, Chip, ChipProps, Typography, useEventCallback } from '@mui/material'
import React, { useState } from 'react'
import { IconSvg } from '../IconSvg'
import { responsiveVal } from '../Styles'
import { iconChevronDown, iconChevronUp } from '../icons'
import { OverlayOrPopperPanel, OverlayOrPopperPanelProps } from './OverlayOrPopperPanel'

function isMulti(
  selectedLabel: React.ReactNode | React.ReactNode[],
): selectedLabel is React.ReactNode[] {
  return Array.isArray(selectedLabel) && selectedLabel.length > 1
}

export type ChipOverlayOrPopperProps = {
  label: React.ReactNode
  selected: boolean
  selectedLabel: React.ReactNode | React.ReactNode[]
  children: OverlayOrPopperPanelProps['children']

  chipProps?: Omit<ChipProps<'button'>, 'clickable' | 'label'>
} & Omit<OverlayOrPopperPanelProps, 'activeEl' | 'children' | 'title'>

export function ChipOverlayOrPopper(props: ChipOverlayOrPopperProps) {
  let { label, selected, selectedLabel, children, chipProps, ...panelProps } = props
  const { onApply, onClose, onReset } = panelProps
  const [activeEl, setActiveEl] = useState<HTMLElement | null>(null)

  const chevronIcon = isMulti(selectedLabel) ? (
    <Typography
      variant='caption'
      color='primary.main'
      sx={{
        display: 'flex',
        alignItems: 'center',
        ml: responsiveVal(3, 8),
      }}
    >
      +{selectedLabel.length - 1}
    </Typography>
  ) : (
    <IconSvg
      src={activeEl ? iconChevronUp : iconChevronDown}
      size='medium'
      sx={{ ml: responsiveVal(3, 8), mr: '-5px' }}
    />
  )

  selectedLabel = Array.isArray(selectedLabel) ? selectedLabel[0] : selectedLabel

  const chipSx = chipProps?.sx ?? []
  return (
    <>
      <Chip
        size='responsive'
        component='button'
        variant='outlined'
        color={selected && !activeEl ? 'primary' : 'default'}
        {...chipProps}
        clickable
        label={
          <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row' }}>
            {selected ? selectedLabel : label}
            {chevronIcon}
          </Typography>
        }
        onClick={useEventCallback((e: React.MouseEvent<HTMLElement>) =>
          setActiveEl((el) => (el !== e.currentTarget ? e.currentTarget : null)),
        )}
        sx={[
          (theme) => ({
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
          }),
          ...(Array.isArray(chipSx) ? chipSx : [chipSx]),
        ]}
      />
      <OverlayOrPopperPanel
        {...panelProps}
        title={label}
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
