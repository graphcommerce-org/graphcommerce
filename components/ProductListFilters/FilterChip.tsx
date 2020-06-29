import React, { useState, PropsWithChildren } from 'react'
import { Chip, Menu, ListItem, ListItemText, ChipProps, makeStyles } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import RemoveCircle from '@material-ui/icons/Cancel'
import clsx from 'clsx'
import { vpCalc } from 'components/Theme'

const useFilterChipStyles = makeStyles((theme: Theme) => ({
  chip: {},
  menu: {
    minWidth: vpCalc(200, 280),
  },
}))

type FilterChipProps = PropsWithChildren<Omit<ChipProps, 'children'>> & {
  selected: boolean
}

export default function FilterChip(props: FilterChipProps) {
  const { children, selected, onDelete, ...chipProps } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const classes = useFilterChipStyles(props)

  let deleteIcon = selected ? <RemoveCircle fontSize='small' /> : <ExpandMore fontSize='small' />
  if (openEl) deleteIcon = <ExpandLess fontSize='small' />

  return (
    <>
      <Chip
        variant={selected ? 'default' : 'outlined'}
        color={selected ? 'primary' : 'default'}
        clickable
        onDelete={onDelete || ((event) => setOpenEl(event.currentTarget.parentElement))}
        onClick={(event) => setOpenEl(event.currentTarget)}
        deleteIcon={deleteIcon}
        {...chipProps}
        className={clsx(classes.chip, chipProps.className)}
      />
      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
        // todo(paales) positioning isn't correct on mobile at it reserves space on the sides, should probably measure the position
        variant='selectedMenu'
        anchorPosition={{ top: 6, left: 0 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        classes={{ paper: classes.menu }}
      >
        {children}
      </Menu>
    </>
  )
}
