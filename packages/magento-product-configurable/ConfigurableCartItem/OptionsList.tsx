import { makeStyles, Menu, Theme } from '@material-ui/core'
import { CartItemOptionDropdown } from '@graphcommerce/magento-cart-items'
import { Button, responsiveVal } from '@graphcommerce/next-ui'
import React, { useState } from 'react'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    optionsList: {
      gridArea: 'itemOptions',
      cursor: 'default',
      marginLeft: 0,
      paddingBottom: 4,
    },
    option: {
      borderBottom: `1px solid ${theme.palette.grey['500']}`,
      color: theme.palette.grey['500'],
      marginRight: theme.spacings.xs,
      paddingBottom: 1,
      display: 'inline',
    },
    menuPaper: {
      minWidth: responsiveVal(200, 560),
      maxWidth: 560,
      marginTop: -8,
      padding: `${theme.spacings.xs} ${theme.spacings.xs}`,
      [theme.breakpoints.down('xs')]: {
        minWidth: 0,
        width: '100%',
        maxWidth: `calc(100% - (${theme.page.horizontal}px * 2))`,
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
    menuTitle: {
      ...theme.typography.h5,
      paddingBottom: theme.spacings.xxs,
      marginBottom: theme.spacings.xxs,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    menuContent: {
      display: 'flex',
    },
    saveChangesWrap: {
      alignSelf: 'center',
    },
    saveChangesButton: {
      padding: '10px 20px',
      fontWeight: theme.typography.fontWeightBold,
      boxShadow: theme.shadows[3],
    },
  }),
  { name: 'CartItemOptionsList' },
)

type CartItemOptionsListProps = ConfigurableCartItemFragment

export default function OptionsList(props: CartItemOptionsListProps) {
  const { configurable_options } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement>()

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
  }

  const handleChange = () => {
    //
  }

  return (
    <>
      <div className={classes.optionsList} onClick={handleClick}>
        {configurable_options &&
          configurable_options.map((option) => (
            <div key={option?.configurable_product_option_uid} className={classes.option}>
              {option?.value_label}
            </div>
          ))}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
        variant='selectedMenu'
        anchorPosition={{ top: 6, left: 0 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        classes={{ paper: classes.menuPaper, list: classes.menuList }}
      >
        <div className={classes.menuTitle}>Edit product</div>
        <div className={classes.menuContent}>
          <CartItemOptionDropdown label='Color' onChange={handleChange} />
          <CartItemOptionDropdown label='Size' onChange={handleChange} />
          <div className={classes.saveChangesWrap}>
            <Button variant='pill' className={classes.saveChangesButton}>
              Save changes
            </Button>
          </div>
        </div>
      </Menu>
    </>
  )
}
