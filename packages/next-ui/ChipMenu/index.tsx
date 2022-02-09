import { Chip, ChipProps, Menu, MenuProps, menuClasses, SxProps, Theme } from '@mui/material'
import React, { PropsWithChildren, useState } from 'react'
import { SectionHeader } from '../SectionHeader'
import { extendableComponent } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { SvgIcon } from '../SvgIcon/SvgIcon'
import { iconChevronDown, iconChevronUp, iconCancelAlt } from '../icons'

const { classes, selectors } = extendableComponent('FilterEqual', ['chip'] as const)

export type ChipMenuProps = PropsWithChildren<Omit<ChipProps, 'children'>> & {
  selectedLabel?: React.ReactNode
  selected: boolean
  onClose?: () => void
  labelRight?: React.ReactNode
  sx?: SxProps<Theme>
  menuProps?: Partial<MenuProps>
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

  let deleteIcon = <SvgIcon src={iconChevronDown} size='medium' />
  if (selected) deleteIcon = <SvgIcon src={iconCancelAlt} size='medium' fillIcon />
  if (openEl) deleteIcon = <SvgIcon src={iconChevronUp} size='medium' />

  const selectedAndMenuHidden = selected && !openEl && !!selectedLabel

  return (
    <>
      <Chip
        color='default'
        clickable
        onDelete={onDelete || ((event) => setOpenEl(event.currentTarget.parentElement))}
        onClick={(event) => {
          setOpenEl(event.currentTarget)
        }}
        deleteIcon={deleteIcon}
        {...chipProps}
        label={selectedLabel ?? label}
        className={`${classes.chip} ${chipProps.className ?? ''} ${
          selectedAndMenuHidden ? 'MuiChip-selected' : ''
        }`}
        sx={[
          { bgcolor: 'background.default' },
          selectedAndMenuHidden &&
            ((theme) => ({
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                background: `${theme.palette.background.default} !important`,
                borderColor: `${theme.palette.divider} !important`,
              },
              '&:focus': {
                background: `${theme.palette.background.paper} !important`,
              },
            })),
        ]}
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

ChipMenu.selectors = selectors
