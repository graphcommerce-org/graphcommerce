import { Chip, Menu, ChipProps, makeStyles, ListSubheader, Theme } from '@material-ui/core'
import RemoveCircle from '@material-ui/icons/Cancel'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React, { useState, PropsWithChildren } from 'react'
import responsiveVal from '../Styles/responsiveVal'

const useChipMenuStyles = makeStyles(
  (theme: Theme) => ({
    chip: {
      '& .MuiChip-label': {
        maxWidth: 148,
      },
    },
    menu: {
      minWidth: responsiveVal(200, 560),
      maxWidth: 560,
      padding: '8px 24px',
      marginTop: 16,
      '& a': {
        padding: '4px 16px',
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: 0,
        maxWidth: '100%',
        width: '100%',
        left: '0 !important',
      },
    },
    listSubHeader: {
      fontWeight: 500,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontSize: 14,
      position: 'relative',
      color: theme.palette.secondary.mutedText,
      '&:after': {
        content: '""',
        background: theme.palette.divider,
        height: 1,
        width: '100%',
        display: 'block',
        position: 'absolute',
        top: 42,
      },
    },
  }),
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

  const selectedColor = selectedLabel ? 'secondary' : 'primary'

  return (
    <>
      <Chip
        variant='default'
        color={selected || openEl ? selectedColor : 'default'}
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
        <ListSubheader component='div' className={classes.listSubHeader}>
          {label}
        </ListSubheader>

        {children}
      </Menu>
    </>
  )
}
