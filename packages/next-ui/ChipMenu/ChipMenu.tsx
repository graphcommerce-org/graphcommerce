import { Box, Chip, ChipProps, SxProps, Theme, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { IconSvg } from '../IconSvg'
import { LayoutOverlaySize } from '../Overlay'
import { iconChevronDown, iconChevronUp } from '../icons'
import { ResponsiveMenu } from './ResponsiveMenu'

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
  actionable?: boolean
  mode?: LayoutOverlaySize
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
    <ResponsiveMenu
      {...props}
      id={id}
      openEl={openEl}
      setOpenEl={setOpenEl}
      onReset={onReset}
      actionable={actionable}
      mode={mode}
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
