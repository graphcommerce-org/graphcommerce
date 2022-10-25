import { Box, Chip, ChipProps, SxProps, Theme, Typography } from '@mui/material'
import React, { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown } from '../icons'
import { ResponsiveMenu } from './ResponsiveMenu'

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
  actionable?: boolean
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
    actionable = true,
    ...chipProps
  } = props

  const deleteIcon = <IconSvg src={iconChevronDown} size='medium' />
  const labelFilterValue = (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography variant='caption'>{label}</Typography>
      {filterValue ? (
        <Typography variant='caption' sx={{ marginLeft: '5px' }}>
          {filterValue}
        </Typography>
      ) : null}
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
      actionable={actionable}
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
              setOpenEl(!openEl ? event.currentTarget.parentElement : null))
          }
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setOpenEl(openEl ? null : event.currentTarget)
          }}
          deleteIcon={deleteIcon}
          {...chipProps}
          label={labelFilterValue}
          sx={[
            ...(selected
              ? [
                  {
                    color: 'primary.main',
                    backgroundColor: '#E6F3ED',
                    borderColor: 'primary.main',
                    '& .MuiChip-label': { marginRight: 1 },
                    '&:hover': { background: '#b0ebd0 !important' },
                  },
                ]
              : [{ borderColor: 'black' }]),
            {
              m: 0.1,
            },
          ]}
        />
      }
    >
      {children}
    </ResponsiveMenu>
  )
}
