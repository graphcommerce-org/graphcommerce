import { Chip, ChipProps, SxProps, Theme } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown, iconChevronUp, iconCancelAlt } from '../icons'
import { ResponsiveMenu } from './ResponsiveMenu'

export type ChipMenuProps = Omit<ChipProps<'button'>, 'children' | 'component'> & {
  selectedLabel?: React.ReactNode
  selected: boolean
  openEl: HTMLElement | null
  setOpenEl: Dispatch<SetStateAction<HTMLElement | null>>
  onClose?: () => void
  onReset?: () => void
  labelRight?: React.ReactNode
  sx?: SxProps<Theme>
  children?: React.ReactNode
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
    selectedLabel,
    openEl,
    setOpenEl,
    onSubmit,
    ...chipProps
  } = props

  let deleteIcon = <IconSvg src={iconChevronDown} size='medium' />
  if (selected) deleteIcon = <IconSvg src={iconCancelAlt} size='medium' fillIcon />
  if (openEl) deleteIcon = <IconSvg src={iconChevronUp} size='medium' />

  const selectedAndMenuHidden = selected && !openEl && !!selectedLabel

  return (
    <ResponsiveMenu
      {...props}
      openEl={openEl}
      setOpenEl={setOpenEl}
      onReset={onReset}
      chip={
        <Chip
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
            setOpenEl(event.currentTarget)
          }}
          deleteIcon={deleteIcon}
          {...chipProps}
          label={selectedLabel ?? label}
        />
      }
    >
      {children}
    </ResponsiveMenu>
  )
}
