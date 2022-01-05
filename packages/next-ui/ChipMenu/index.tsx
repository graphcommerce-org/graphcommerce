import { Chip, ChipProps, Menu } from '@mui/material'
import clsx from 'clsx'
import React, { PropsWithChildren, useState } from 'react'
import { UseStyles } from '..'
import SectionHeader from '../SectionHeader'
import { responsiveVal } from '../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconChevronDown, iconChevronUp, iconCancelAlt } from '../icons'

export const useChipMenuStyles = makeStyles({ name: 'ChipMenu' })((theme) => ({
  chip: {
    background: `${theme.palette.background.default} !important`,
  },
  chipSelected: {
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
    '&:hover': {
      background: `${theme.palette.background.default} !important`,
      borderColor: theme.palette.divider,
    },
    '&:focus': {
      background: `${theme.palette.background.paper} !important`,
    },
  },
  menuPaper: {
    minWidth: responsiveVal(200, 560),
    maxWidth: 560,
    marginTop: theme.spacings.xxs,
    padding: `${theme.spacings.xs} ${theme.spacings.xs}`,
    [theme.breakpoints.down('sm')]: {
      minWidth: 0,
      width: '100%',
      maxWidth: `calc(100% - (${theme.page.horizontal} * 2))`,
      margin: '0 auto',
      marginTop: '8px',
    },
  },
  iconCancel: {
    stroke: `none !important`,
    fill: `${theme.palette.text.primary} !important`,
  },
  menuList: {
    padding: 0,
    '&:focus': {
      outline: 'none',
    },
  },
  sectionHeaderWrapper: {
    marginTop: 10,
  },
}))

export type ChipMenuProps = PropsWithChildren<Omit<ChipProps, 'children'>> & {
  selectedLabel?: React.ReactNode
  selected: boolean
  onClose?: () => void
  labelRight?: React.ReactNode
} & UseStyles<typeof useChipMenuStyles>

export default function ChipMenu(props: ChipMenuProps) {
  const { children, selected, onDelete, label, labelRight, onClose, selectedLabel, ...chipProps } =
    props

  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const classes = useMergedClasses(useChipMenuStyles().classes, props.classes)

  let deleteIcon = selected ? (
    <div>
      <SvgImageSimple src={iconCancelAlt} className={classes.iconCancel} />
    </div>
  ) : (
    <SvgImageSimple src={iconChevronDown} />
  )
  if (openEl) deleteIcon = <SvgImageSimple src={iconChevronUp} />

  const selectedAndMenuHidden = selected && !openEl && selectedLabel

  return (
    <>
      <Chip
        color={selected || openEl ? 'primary' : 'default'}
        clickable
        onDelete={onDelete || ((event) => setOpenEl(event.currentTarget.parentElement))}
        onClick={(event) => {
          setOpenEl(event.currentTarget)
        }}
        deleteIcon={deleteIcon}
        {...chipProps}
        label={selectedLabel ?? label}
        className={clsx(
          classes.chip,
          chipProps.className,
          selectedAndMenuHidden && classes.chipSelected,
        )}
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
        classes={{ paper: classes.menuPaper, list: classes.menuList }}
      >
        <SectionHeader
          labelLeft={label ?? ''}
          labelRight={labelRight ?? ''}
          usePadding
          classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
        />
        {children}
      </Menu>
    </>
  )
}
