import React, { PropsWithChildren } from 'react'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { Fab, FabProps, makeStyles, Menu } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useStyles = makeStyles(
  {
    menu: { minWidth: vpCalc(200, 280) },
  },
  { name: 'CartSkeleton' },
)

const CartSkeleton = React.forwardRef<HTMLButtonElement, PropsWithChildren<Omit<FabProps, 'size'>>>(
  ({ children, ...fabProps }, ref) => {
    const classes = useStyles()
    const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

    return (
      <>
        <Fab
          aria-label='Open Cart'
          size='medium'
          {...fabProps}
          onClick={(event) => setOpenEl(event.currentTarget)}
          ref={ref}
        >
          <CartIcon fontSize='small' />
        </Fab>
        <Menu
          anchorEl={openEl}
          open={!!openEl}
          onClose={() => setOpenEl(null)}
          keepMounted
          variant='menu'
          classes={{ paper: classes.menu }}
        >
          {children}
        </Menu>
      </>
    )
  },
)

export default CartSkeleton
