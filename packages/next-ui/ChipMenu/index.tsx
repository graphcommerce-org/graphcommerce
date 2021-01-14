import { Chip, Menu, ChipProps, makeStyles, ListSubheader, Theme } from '@material-ui/core'
import RemoveCircle from '@material-ui/icons/Cancel'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React, { useState, PropsWithChildren } from 'react'
import responsiveVal from '../Styles/responsiveVal'

export const useChipMenuStyles = makeStyles(
  (theme: Theme) => ({
    /* 
      !importants: ensure background #xxxxxx on hover, focus etc regardless given props to the component 
      otherwise you'll get: ".MuiChip-deletable.MuiChip-outlined:hover" which is prone to changes and thereby a fragile selector
    */
    chip: {
      paddingTop: 1,
      background: theme.palette.background.default,
      '& .MuiChip-label': {
        wordWrap: 'break-word',
      },
      '&:focus': {
        background: `${theme.palette.background.default} !important`,
      },
    },
    chipOpenMenu: {
      borderWidth: 2,
    },
    chipSelected: {
      border: `1px solid ${theme.palette.primary.contrastText}`,
      background: theme.palette.grey['100'],
      color: theme.palette.primary.contrastText,
      '&:hover': {
        background: `${theme.palette.background.default} !important`,
        borderColor: theme.palette.grey['600'],
        '& svg': {
          color: `${theme.palette.grey['600']} !important`,
        },
      },
      '&:focus': {
        background: `${theme.palette.grey['100']} !important`,
      },
      '& svg': {
        color: ` ${theme.palette.primary.contrastText} !important`,
      },
    },
    menuPaper: {
      minWidth: responsiveVal(200, 560),
      maxWidth: 560,
      marginTop: theme.spacings.xxs,
      padding: `${theme.spacings.xs} ${theme.spacings.xs}`,
      [theme.breakpoints.down('xs')]: {
        minWidth: 0,
        width: '100%',
        maxWidth: `calc(100% - (${theme.page.horizontal} * 2))`,
        margin: '0 auto',
        marginTop: '8px',
      },
    },
    menuList: {
      padding: 0,
      '&:focus': {
        outline: 'none',
      },
    },
    labelContainer: {
      paddingLeft: theme.spacings.xxs,
      paddingRight: theme.spacings.xxs,
      position: 'relative',
      '&:focus': {
        outline: 'none',
      },
    },
    labelInnerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: responsiveVal(6, 12),
    },
    labelLeft: {
      ...theme.typography.body2,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontWeight: 500,
      color: theme.palette.secondary.mutedText,
    },
    labelRight: {
      ...theme.typography.body2,
      color: theme.palette.primary.contrastText,
    },
    actions: {},
  }),
  { name: 'ChipMenu' },
)

export type ChipMenuProps = PropsWithChildren<Omit<ChipProps, 'children'>> & {
  selectedLabel?: React.ReactNode
  selected: boolean
  onClose?: () => void
  labelRight?: React.ReactNode
}

export default function ChipMenu(props: ChipMenuProps) {
  const {
    children,
    selected,
    onDelete,
    label,
    labelRight,
    onClose,
    selectedLabel,
    ...chipProps
  } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const classes = useChipMenuStyles(props)

  let deleteIcon = selected ? <RemoveCircle fontSize='small' /> : <ExpandMore fontSize='small' />
  if (openEl) deleteIcon = <ExpandLess fontSize='small' />

  const selectedAndMenuHidden = selected && !openEl && selectedLabel

  return (
    <>
      <Chip
        variant='default'
        color={selected || openEl ? 'primary' : 'default'}
        clickable
        onDelete={onDelete || ((event) => setOpenEl(event.currentTarget.parentElement))}
        onClick={(event) => setOpenEl(event.currentTarget)}
        deleteIcon={deleteIcon}
        {...chipProps}
        label={selectedLabel ?? label}
        className={clsx(
          classes.chip,
          chipProps.className,
          selectedAndMenuHidden && classes.chipSelected,
          openEl && classes.chipOpenMenu,
        )}
      />
      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => {
          if (onClose) onClose()

          setOpenEl(null)
        }}
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
        variant='selectedMenu'
        anchorPosition={{ top: 6, left: 0 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        classes={{ paper: classes.menuPaper, list: classes.menuList }}
      >
        <div className={classes.labelContainer}>
          <div className={classes.labelInnerContainer}>
            <div className={classes.labelLeft}>{label}</div>
            <div className={classes.labelRight}>{labelRight}</div>
          </div>
        </div>
        {children}
      </Menu>
    </>
  )
}
