import { Box, Chip, ChipProps, SxProps, Theme, Typography } from '@mui/material'
import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown } from '../icons'
import { ResponsiveMenu } from './ResponsiveMenu'

export type ChipMenuProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component'>
> & {
  filterCount?: number
  selected: boolean
  openEl: HTMLElement | null
  setOpenEl: Dispatch<SetStateAction<HTMLElement | null>>
  onClose?: () => void
  onReset?: () => void
  labelRight?: React.ReactNode
  sx?: SxProps<Theme>
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
    filterCount,
    openEl,
    setOpenEl,
    onSubmit,
    accessKey,
    id = 'filterpopper',
    ...chipProps
  } = props

  let deleteIcon = <IconSvg src={iconChevronDown} size='medium' />
  if (selected && filterCount)
    deleteIcon = (
      <Box
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color='white' variant='caption' sx={{ paddingX: '7px', marginTop: '0px' }}>
          {filterCount}
        </Typography>
      </Box>
    )

  const selectedAndMenuHidden = selected && !openEl

  return (
    <ResponsiveMenu
      {...props}
      id={id}
      openEl={openEl}
      setOpenEl={setOpenEl}
      onReset={onReset}
      chip={
        <Chip
          aria-describedby={id}
          component='button'
          size='responsive'
          color={selectedAndMenuHidden ? 'primary' : 'default'}
          clickable
          onDelete={
            onDelete ||
            ((event: React.MouseEvent<HTMLButtonElement>) =>
              setOpenEl(event.currentTarget.parentElement))
          }
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setOpenEl(openEl ? null : event.currentTarget)
          }}
          deleteIcon={deleteIcon}
          {...chipProps}
          label={label}
          sx={[
            ...(selected
              ? [
                  {
                    backgroundColor: '#E6F3ED',
                    borderColor: 'transparent',
                    '& .MuiChip-label': { marginRight: 1 },
                    '&:hover': { background: '#b0ebd0 !important' },
                  },
                ]
              : [{ borderColor: 'black' }]),
          ]}
        />
      }
    >
      {children}
    </ResponsiveMenu>
  )
}
