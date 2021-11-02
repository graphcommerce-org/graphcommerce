import { Chip, ChipProps, makeStyles, Menu, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { PropsWithChildren, useState } from 'react'
import SectionHeader from '../SectionHeader'
import responsiveVal from '../Styles/responsiveVal'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconChevronDown, iconChevronUp, iconCancelAlt } from '../icons'

export const useChipMenuStyles = makeStyles(
  (theme: Theme) => ({
    chip: {},
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
      '& svg': {
        stroke: theme.palette.text.primary,
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
  const { children, selected, onDelete, label, labelRight, onClose, selectedLabel, ...chipProps } =
    props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const classes = useChipMenuStyles(props)

  let deleteIcon = selected ? (
    <SvgImageSimple src={iconCancelAlt} className={classes.iconCancel} />
  ) : (
    <SvgImageSimple src={iconChevronDown} />
  )
  if (openEl) deleteIcon = <SvgImageSimple src={iconChevronUp} />

  const selectedAndMenuHidden = selected && !openEl && selectedLabel

  return (
    <>
      <Chip
        variant='default'
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
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
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
