import { Chip, Menu, ChipProps, makeStyles, ListSubheader } from '@material-ui/core'
import RemoveCircle from '@material-ui/icons/Cancel'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React, { useState, PropsWithChildren } from 'react'
import responsiveVal from '../Styles/responsiveVal'

const useChipMenuStyles = makeStyles(
  {
    chip: {},
    menu: {
      minWidth: responsiveVal(200, 280),
    },
  },
  { name: 'ChipMenu' },
)

export type ChipMenuProps = PropsWithChildren<Omit<ChipProps, 'children'>> & {
  selectedLabel?: string
  selected: boolean
}

export default function ChipMenu(props: ChipMenuProps) {
  const { children, selected, onDelete, label, selectedLabel, ...chipProps } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const classes = useChipMenuStyles(props)

  let deleteIcon = selected ? <RemoveCircle fontSize='small' /> : <ExpandMore fontSize='small' />
  if (openEl) deleteIcon = <ExpandLess fontSize='small' />

  return (
    <>
      <Chip
        variant={selected ? 'default' : 'default'}
        color={selected ? 'primary' : 'default'}
        clickable
        onDelete={onDelete || ((event) => setOpenEl(event.currentTarget.parentElement))}
        onClick={(event) => setOpenEl(event.currentTarget)}
        deleteIcon={deleteIcon}
        {...chipProps}
        label={selectedLabel ?? label}
        className={clsx(classes.chip, chipProps.className)}
      />
      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
        variant='selectedMenu'
        anchorPosition={{ top: 6, left: 0 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        classes={{ paper: classes.menu }}
      >
        <ListSubheader component='div'>{label}</ListSubheader>
        {children}
      </Menu>
    </>
  )
}
