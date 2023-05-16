'use client'

import { Chip, ChipProps, Menu, MenuProps, menuClasses, SxProps, Theme } from '@mui/material'
import React, { useState } from 'react'
import { IconSvg } from '../IconSvg'
import { SectionHeader } from '../SectionHeader/SectionHeader'
import { responsiveVal } from '../Styles/responsiveVal'
import { iconChevronDown, iconChevronUp, iconCancelAlt } from '../icons'

export type ChipMenuProps = Omit<ChipProps<'button'>, 'children' | 'component'> & {
  selectedLabel?: React.ReactNode
  selected: boolean
  onClose?: () => void
  labelRight?: React.ReactNode
  sx?: SxProps<Theme>
  menuProps?: Partial<MenuProps>
  children?: React.ReactNode
}

export function ChipMenu(props: ChipMenuProps) {
  const {
    children,
    selected,
    onDelete,
    label,
    labelRight,
    onClose,
    selectedLabel,
    menuProps,
    ...chipProps
  } = props

  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)

  let deleteIcon = <IconSvg src={iconChevronDown} size='medium' />
  if (selected) deleteIcon = <IconSvg src={iconCancelAlt} size='medium' fillIcon />
  if (openEl) deleteIcon = <IconSvg src={iconChevronUp} size='medium' />

  const selectedAndMenuHidden = selected && !openEl && !!selectedLabel

  return (
    <>
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

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => {
          if (onClose) onClose()
          setOpenEl(null)
        }}
        anchorPosition={{ top: 6, left: 0 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        {...menuProps}
        sx={[
          (theme) => ({
            marginTop: theme.spacings.xxs,
            [`& .${menuClasses.list}`]: {
              padding: 0,
              '&:focus': { outline: 'none' },
            },
            [`& .${menuClasses.paper}`]: {
              minWidth: responsiveVal(200, 560),
              maxWidth: 560,
              padding: `0 ${theme.spacings.xs} ${theme.spacings.xs}`,
              margin: 0,
              [theme.breakpoints.down('sm')]: {
                minWidth: 0,
                width: '100%',
                maxWidth: `calc(100% - (${theme.page.horizontal} * 2))`,
                margin: '0 auto',
              },
            },
          }),
          // eslint-disable-next-line no-nested-ternary
          ...(menuProps?.sx ? (Array.isArray(menuProps.sx) ? menuProps.sx : [menuProps.sx]) : []),
        ]}
      >
        <SectionHeader labelLeft={label ?? ''} labelRight={labelRight ?? ''} usePadding />
        {children}
      </Menu>
    </>
  )
}
