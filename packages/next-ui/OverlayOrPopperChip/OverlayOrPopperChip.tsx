import { Badge, Chip, ChipProps, SxProps, Typography, useEventCallback, Theme } from '@mui/material'
import React, { useState } from 'react'
import { IconSvg } from '../IconSvg'
import { lighten, responsiveVal } from '../Styles'
import { iconChevronDown, iconChevronUp } from '../icons'
import { OverlayOrPopperPanel, OverlayOrPopperPanelProps } from './OverlayOrPopperPanel'

function isMulti(
  selectedLabel: React.ReactNode | React.ReactNode[],
): selectedLabel is React.ReactNode[] {
  return Array.isArray(selectedLabel) && selectedLabel.length >= 1
}

export type ChipOverlayOrPopperProps = {
  label: React.ReactNode
  selected: boolean
  selectedLabel: React.ReactNode | React.ReactNode[]
  children: OverlayOrPopperPanelProps['children']
  sx?: SxProps<Theme>
  chipProps?: Omit<ChipProps<'button'>, 'clickable' | 'label'>
} & Omit<OverlayOrPopperPanelProps, 'activeEl' | 'children' | 'title'>

export function ChipOverlayOrPopper(props: ChipOverlayOrPopperProps) {
  let { label, selected, selectedLabel, children, chipProps, sx = [], ...panelProps } = props
  const { onApply, onClose, onReset } = panelProps
  const [activeEl, setActiveEl] = useState<HTMLElement | null>(null)

  let chevronIcon = (
    <IconSvg
      src={activeEl ? iconChevronUp : iconChevronDown}
      size='medium'
      sx={{ ml: responsiveVal(3, 8), mr: '-5px' }}
    />
  )

  if (selected) {
    chevronIcon = (
      <Badge
        color='primary'
        badgeContent={isMulti(selectedLabel) ? selectedLabel.length : 1}
        sx={{
          alignItems: 'center',
          '.MuiBadge-badge': {
            position: 'relative',
            transform: 'none',
            ml: { xs: '2px', md: '6px' },
            typography: 'caption',
            fontWeight: 'bold',
          },
        }}
      />
    )
  }

  selectedLabel = Array.isArray(selectedLabel) ? selectedLabel[0] : (selectedLabel ?? '·')

  const chipSx = chipProps?.sx ?? []
  return (
    <>
      <Chip
        size='responsive'
        component='button'
        variant='outlined'
        color='default'
        {...chipProps}
        clickable
        label={
          <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row' }}>
            {label}
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
                  ...lighten(
                    'background',
                    theme.vars.palette.primary.main,
                    `1 - ${theme.vars.palette.action.hoverOpacity}`,
                  ),

                  ...theme.applyStyles('dark', {
                    ...lighten(
                      'background',
                      theme.vars.palette.background.default,
                      theme.vars.palette.action.hoverOpacity,
                    ),
                  }),
                  border: '1px solid transparent',
                  '&.MuiChip-clickable:hover': {
                    ...lighten(
                      'background',
                      theme.vars.palette.primary.main,
                      `1 - ${theme.vars.palette.action.hoverOpacity} * 2`,
                    ),

                    ...theme.applyStyles('dark', {
                      ...lighten(
                        'background',
                        theme.vars.palette.background.default,
                        `${theme.vars.palette.action.hoverOpacity} * 2`,
                      ),
                    }),
                    border: '1px solid transparent',
                  },
                }
              : {}),
          }),
          ...(Array.isArray(chipSx) ? chipSx : [chipSx]),
          ...(Array.isArray(sx) ? sx : [sx]),
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
