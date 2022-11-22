import { Box, Chip, ChipProps, SxProps, Theme, Typography } from '@mui/material'
import React, { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown, iconChevronUp } from '../icons'
import { OverlayFilterPanel } from './OverlayFilterPanel'
import { PopperFilterPanel } from './PopperFilterPanel'

export type ChipMenuProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component'>
> & {
  filterValue?: string | ReactNode
  selected: boolean
  openEl: HTMLElement | null
  setOpenEl: Dispatch<SetStateAction<HTMLElement | null>>
  onClose?: () => void
  onReset?: () => void
  labelRight?: React.ReactNode
  sx?: SxProps<Theme>
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
    mode = 'popper',
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
          minWidth: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' color='primary.contrastText'>
          {filterValue}
        </Typography>
      </Box>
    )

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
        sx={{ borderColor: !selected ? 'black' : 'primary.main' }}
      />
      {mode === 'overlay' && <OverlayFilterPanel {...props}>{children}</OverlayFilterPanel>}
      {mode === 'popper' && <PopperFilterPanel {...props}>{children}</PopperFilterPanel>}
    </>
  )
}
