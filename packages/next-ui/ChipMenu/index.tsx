import { Chip, ChipProps, makeStyles, Menu, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { PropsWithChildren, useState } from 'react'
import { iconChevronDown, iconChevronUp, iconCloseCircle } from '../icons'
import SectionHeader from '../SectionHeader'
import responsiveVal from '../Styles/responsiveVal'
import SvgImage from '../SvgImage'

export const useChipMenuStyles = makeStyles(
  (theme: Theme) => ({
    /*
      !importants: ensure background #xxxxxx on hover, focus etc regardless given props to the component 
      otherwise you'll get: ".MuiChip-deletable.MuiChip-outlined:hover" which is prone to changes and thereby a fragile selector
    */
    chip: {
      background: theme.palette.background.default,
      '& .MuiChip-label': {
        wordWrap: 'break-word',
      },
      '&:hover': {
        background: `${theme.palette.background.highlight} !important`,
      },
      '&:focus': {
        background: `${theme.palette.background.default} !important`,
      },
    },
    chipSelected: {
      border: `1px solid ${theme.palette.text.primary}`,
      background: theme.palette.grey['100'],
      color: theme.palette.text.primary,
      '&:hover': {
        background: `${theme.palette.background.default} !important`,
        borderColor: theme.palette.grey['600'],
      },
      '&:focus': {
        background: `${theme.palette.grey['100']} !important`,
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
    <SvgImage size='medium' src={iconCloseCircle} alt='close' shade='default' />
  ) : (
    <SvgImage
      size='medium'
      src={iconChevronDown}
      alt='chevron down'
      loading='eager'
      shade='muted'
    />
  )
  if (openEl)
    deleteIcon = (
      <SvgImage size='medium' src={iconChevronUp} alt='chevron up' loading='eager' shade='muted' />
    )

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
        <SectionHeader labelLeft={label ?? ''} labelRight={labelRight ?? ''} usePadding />
        {children}
      </Menu>
    </>
  )
}
