import { alpha, Box, Chip, ChipProps, SxProps, Theme, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown, iconChevronUp } from '../icons'
import { OverlayFilterPanel } from './OverlayFilterPanel'
import { PopperFilterPanel } from './PopperFilterPanel'

export type ChipMenuProps = Omit<ChipProps<'button'>, 'children' | 'component'> & {
  filterValue?: string | React.ReactNode
  selected: boolean
  openEl: HTMLElement | null
  setOpenEl: Dispatch<SetStateAction<HTMLElement | null>>
  onClose?: () => void
  onReset?: () => void
  labelRight?: React.ReactNode
  sx?: SxProps<Theme>
  children?: React.ReactNode
  mode?: 'overlay' | 'popper'
}

export function ChipMenu(props: ChipMenuProps) {
  const {
    children,
    selected,
    onDelete,
    onReset,
    label,
    labelRight,
    onClose,
    filterValue,
    openEl,
    setOpenEl,
    onSubmit,
    accessKey,
    id = 'filterpopper',
    mode = 'minimal',
    ...chipProps
  } = props

  let deleteIcon = <IconSvg src={iconChevronDown} size='medium' />
  if (openEl) deleteIcon = <IconSvg src={iconChevronUp} size='medium' />
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
  // const labelFilterValue = (
  //   <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  //     <Typography variant='caption'>{label}</Typography>
  //     {filterValue ? (
  //       <Typography variant='caption' sx={{ marginLeft: '5px' }}>
  //         {filterValue}
  //       </Typography>
  //     ) : null}
  //   </Box>
  // )

  const selectedAndMenuHidden = selected && !openEl

  return (
    <>
      <Chip
        aria-describedby={id}
        component='button'
        size='responsive'
        color={selectedAndMenuHidden ? 'primary' : 'default'}
        clickable
        onDelete={onDelete || onClose}
        deleteIcon={deleteIcon}
        {...chipProps}
        label={label}
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
      {mode === 'overlay' && <OverlayFilterPanel {...props}>{children}</OverlayFilterPanel>}
      {mode === 'popper' && <PopperFilterPanel {...props}>{children}</PopperFilterPanel>}
    </>
  )
}
